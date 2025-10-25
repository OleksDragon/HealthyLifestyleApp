using Minio;
using Minio.Exceptions;
using Minio.DataModel.Args;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using HealthyLifestyle.Application.Interfaces.ObjectStorage;
using System.Threading;

namespace HealthyLifestyle.Application.Services.ObjectStorage;

public class MinioService : IObjectStorageService
{
    private readonly IMinioClient _minioClient;
    private readonly MinioSettings _settings;
    private readonly ILogger<MinioService> _logger;

    public MinioService(IOptions<MinioSettings> settings, ILogger<MinioService> logger)
    {
        _settings = settings.Value;
        _logger = logger;

        _minioClient = new MinioClient()
            .WithEndpoint(_settings.Endpoint)
            .WithCredentials(_settings.AccessKey, _settings.SecretKey)
            .Build();
    }

    public async Task<string> UploadFileAsync(Stream stream, string objectName, string contentType)
    {
        try
        {
            _logger.LogInformation("Starting upload of file: {ObjectName}", objectName);

            var bucketExistsArgs = new BucketExistsArgs().WithBucket(_settings.BucketName);
            bool bucketExists = await _minioClient.BucketExistsAsync(bucketExistsArgs);

            if (!bucketExists)
            {
                var makeBucketArgs = new MakeBucketArgs().WithBucket(_settings.BucketName);
                await _minioClient.MakeBucketAsync(makeBucketArgs);
                _logger.LogInformation("Bucket '{BucketName}' created successfully", _settings.BucketName);
            }

            var putObjectArgs = new PutObjectArgs()
                .WithBucket(_settings.BucketName)
                .WithObject(objectName)
                .WithStreamData(stream)
                .WithObjectSize(stream.Length)
                .WithContentType(contentType);

            await _minioClient.PutObjectAsync(putObjectArgs);
            _logger.LogInformation("File '{ObjectName}' uploaded successfully", objectName);

            return $"{_settings.Endpoint}/{_settings.BucketName}/{objectName}";
        }
        catch (MinioException ex)
        {
            _logger.LogError(ex, "MinIO error during upload of file '{ObjectName}'", objectName);
            throw;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "General error during upload of file '{ObjectName}'", objectName);
            throw;
        }
    }

    public async Task DeleteFileAsync(string fileUrl)
    {
        try
        {
            _logger.LogInformation("Starting deletion of file: {FileUrl}", fileUrl);

            // Extract object name from URL
            var uri = new Uri(fileUrl);
            var objectName = string.Join("", uri.Segments.Skip(2));

            var removeObjectArgs = new RemoveObjectArgs()
                .WithBucket(_settings.BucketName)
                .WithObject(objectName);

            await _minioClient.RemoveObjectAsync(removeObjectArgs);
            _logger.LogInformation("File '{ObjectName}' deleted successfully", objectName);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting file '{FileUrl}'", fileUrl);
            throw;
        }
    }

    public async Task<Stream> GetFileAsync(string objectName, CancellationToken cancellationToken)
    {
        for (int attempt = 1; attempt <= 3; attempt++)
        {
            try
            {
                _logger.LogInformation("Starting download of file: {ObjectName} (attempt {Attempt}/3)", objectName, attempt);

                var memoryStream = new MemoryStream();

                var getObjectArgs = new GetObjectArgs()
                    .WithBucket(_settings.BucketName)
                    .WithObject(objectName)
                    .WithCallbackStream(async s =>
                    {
                        using var temp = new MemoryStream();
                        await s.CopyToAsync(temp, cancellationToken);
                        temp.Seek(0, SeekOrigin.Begin);
                        await temp.CopyToAsync(memoryStream, cancellationToken);
                    });

                await _minioClient.GetObjectAsync(getObjectArgs, cancellationToken);

                memoryStream.Seek(0, SeekOrigin.Begin);
                _logger.LogInformation("File '{ObjectName}' downloaded successfully, size: {Size} bytes", objectName, memoryStream.Length);
                return memoryStream;
            }
            catch (IOException ex)
            {
                _logger.LogWarning("Network error during download attempt {Attempt} for file '{ObjectName}': {Message}", attempt, objectName, ex.Message);
                if (attempt == 3)
                {
                    _logger.LogError(ex, "Failed to download file '{ObjectName}' after 3 attempts", objectName);
                    throw;
                }
                await Task.Delay(1000, cancellationToken);
            }
            catch (OperationCanceledException)
            {
                _logger.LogWarning("Download of file '{ObjectName}' was cancelled", objectName);
                throw;
            }
            catch (MinioException ex)
            {
                _logger.LogError(ex, "MinIO error during download of file '{ObjectName}'", objectName);
                throw new FileNotFoundException($"File '{objectName}' not found in MinIO", ex);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "General error during download of file '{ObjectName}'", objectName);
                throw;
            }
        }

        throw new InvalidOperationException($"Failed to download file '{objectName}' after 3 attempts");
    }

    public async Task<string> GetPresignedUrlAsync(string objectName, int expiryInSeconds)
    {
        try
        {
            _logger.LogInformation("Generating presigned URL for file: {ObjectName}", objectName);

            var args = new PresignedGetObjectArgs()
                .WithBucket(_settings.BucketName)
                .WithObject(objectName)
                .WithExpiry(expiryInSeconds);

            var url = await _minioClient.PresignedGetObjectAsync(args);
            _logger.LogInformation("Presigned URL generated successfully for file: {ObjectName}", objectName);
            return url;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating presigned URL for file '{ObjectName}'", objectName);
            throw;
        }
    }
    public async Task<bool> FileExistsAsync(string objectName, CancellationToken cancellationToken = default)
    {
        try
        {
            _logger.LogInformation("Checking if file exists: {ObjectName}", objectName);

            var statObjectArgs = new StatObjectArgs()
                .WithBucket(_settings.BucketName)
                .WithObject(objectName);

            await _minioClient.StatObjectAsync(statObjectArgs, cancellationToken);
            _logger.LogInformation("File '{ObjectName}' exists", objectName);
            return true;
        }
        catch (ObjectNotFoundException)
        {
            _logger.LogInformation("File '{ObjectName}' does not exist", objectName);
            return false;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error checking if file '{ObjectName}' exists", objectName);
            return false;
        }
    }
}
