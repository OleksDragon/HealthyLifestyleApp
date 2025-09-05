using Minio;
using Minio.Exceptions;
using Minio.DataModel.Args;
using Microsoft.Extensions.Options;
using HealthyLifestyle.Application.Interfaces.ObjectStorage;

namespace HealthyLifestyle.Application.Services.ObjectStorage;

public class MinioService : IObjectStorageService
{
    private readonly IMinioClient _minioClient;
    private readonly MinioSettings _settings;

    public MinioService(IOptions<MinioSettings> settings)
    {
        _settings = settings.Value;

        _minioClient = new MinioClient()
            .WithEndpoint(_settings.Endpoint)
            .WithCredentials(_settings.AccessKey, _settings.SecretKey)
            .Build();
    }

    public async Task<string> UploadFileAsync(Stream stream, string objectName, string contentType)
    {
        try
        {
            var foundArgs = new BucketExistsArgs().WithBucket(_settings.BucketName);
            bool found = await _minioClient.BucketExistsAsync(foundArgs).ConfigureAwait(false);
            if (!found)
            {
                var mkBucketArgs = new MakeBucketArgs().WithBucket(_settings.BucketName);
                await _minioClient.MakeBucketAsync(mkBucketArgs).ConfigureAwait(false);
                Console.WriteLine($"Бакет '{_settings.BucketName}' успешно создан.");
            }

            var putObjectArgs = new PutObjectArgs()
                .WithBucket(_settings.BucketName)
                .WithObject(objectName)
                .WithStreamData(stream)
                .WithObjectSize(stream.Length)
                .WithContentType(contentType);

            await _minioClient.PutObjectAsync(putObjectArgs).ConfigureAwait(false);
            Console.WriteLine($"Файл '{objectName}' успешно загружен.");

            return $"{_settings.Endpoint}/{_settings.BucketName}/{objectName}";
        }
        catch (MinioException e)
        {
            Console.WriteLine($"Ошибка MinIO: {e.Message}");
            throw;
        }
        catch (Exception e)
        {
            Console.WriteLine($"Общая ошибка: {e.Message}");
            throw;
        }
    }

    /// <summary>
    /// Удаляет файл из хранилища.
    /// </summary>
    /// <param name="fileUrl">URL-адрес файла для удаления.</param>
    public async Task DeleteFileAsync(string fileUrl)
    {
        var uri = new Uri(fileUrl);
        var bucketName = uri.Segments[1].TrimEnd('/');
        var objectName = string.Join("", uri.Segments.Skip(2));

        var removeObjectArgs = new RemoveObjectArgs()
            .WithBucket(bucketName)
            .WithObject(objectName);

        await _minioClient.RemoveObjectAsync(removeObjectArgs);
    }

    public async Task<Stream> GetFileAsync(string objectName)
    {
        try
        {
            var statObjectArgs = new StatObjectArgs()
                .WithBucket(_settings.BucketName)
                .WithObject(objectName);

            var stream = new MemoryStream();
            var getObjectArgs = new GetObjectArgs()
                .WithBucket(_settings.BucketName)
                .WithObject(objectName)
                .WithCallbackStream(async (s) => await s.CopyToAsync(stream).ConfigureAwait(false));

            await _minioClient.GetObjectAsync(getObjectArgs).ConfigureAwait(false);

            stream.Seek(0, SeekOrigin.Begin);
            return stream;
        }
        catch (MinioException e)
        {
            Console.WriteLine($"Ошибка MinIO: {e.Message}");
            throw;
        }
        catch (Exception e)
        {
            Console.WriteLine($"Общая ошибка: {e.Message}");
            throw;
        }
    }
}