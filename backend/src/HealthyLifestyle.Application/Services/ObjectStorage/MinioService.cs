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

                await SetPublicReadPolicyAsync();
            }
            else
            {
                await EnsurePublicReadPolicyAsync();
            }

            var putObjectArgs = new PutObjectArgs()
                .WithBucket(_settings.BucketName)
                .WithObject(objectName)
                .WithStreamData(stream)
                .WithObjectSize(stream.Length)
                .WithContentType(contentType);

            await _minioClient.PutObjectAsync(putObjectArgs).ConfigureAwait(false);
            Console.WriteLine($"Файл '{objectName}' успешно загружен.");

            // Возвращаем URL с localhost для браузера
            return $"http://localhost:9000/{_settings.BucketName}/{objectName}";
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
    /// Устанавливает политику публичного доступа на чтение для bucket
    /// </summary>
    private async Task SetPublicReadPolicyAsync()
    {
        try
        {
            var policyJson = $@"{{
                ""Version"": ""2012-10-17"",
                ""Statement"": [
                    {{
                        ""Effect"": ""Allow"",
                        ""Principal"": ""*"",
                        ""Action"": ""s3:GetObject"",
                        ""Resource"": ""arn:aws:s3:::{_settings.BucketName}/*""
                    }}
                ]
            }}";

            var setPolicyArgs = new SetPolicyArgs()
                .WithBucket(_settings.BucketName)
                .WithPolicy(policyJson);

            await _minioClient.SetPolicyAsync(setPolicyArgs);
            Console.WriteLine($"Политика публичного доступа установлена для bucket '{_settings.BucketName}'");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Ошибка установки политики: {ex.Message}");
            // Не бросаем исключение, чтобы не ломать загрузку файлов
        }
    }

    /// <summary>
    /// Проверяет и устанавливает политику если её нет
    /// </summary>
    private async Task EnsurePublicReadPolicyAsync()
    {
        try
        {
            var getPolicyArgs = new GetPolicyArgs().WithBucket(_settings.BucketName);
            var currentPolicy = await _minioClient.GetPolicyAsync(getPolicyArgs);

            // Если политика пустая или не содержит разрешения на GetObject, устанавливаем новую
            if (string.IsNullOrEmpty(currentPolicy) || !currentPolicy.Contains("s3:GetObject"))
            {
                await SetPublicReadPolicyAsync();
            }
        }
        catch (MinioException ex) when (ex.Message.Contains("The bucket policy does not exist"))
        {
            // Политика не существует - устанавливаем
            await SetPublicReadPolicyAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Ошибка проверки политики: {ex.Message}");
        }
    }

    public async Task DeleteFileAsync(string objectName)
    {
        try
        {
            var removeObjectArgs = new RemoveObjectArgs()
                .WithBucket(_settings.BucketName)
                .WithObject(objectName);

            await _minioClient.RemoveObjectAsync(removeObjectArgs);
            Console.WriteLine($"Файл '{objectName}' успішно видалено.");
        }
        catch (Exception e)
        {
            Console.WriteLine($"Помилка видалення об'єкта {objectName}: {e.Message}");
            throw;
        }
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

    public async Task<string> GetPresignedUrlAsync(string objectName, int expiryInSeconds)
    {
        try
        {
            var args = new PresignedGetObjectArgs()
                .WithBucket(_settings.BucketName)
                .WithObject(objectName)
                .WithExpiry(expiryInSeconds);

            return await _minioClient.PresignedGetObjectAsync(args).ConfigureAwait(false);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Помилка генерації pre-signed URL: {e.Message}");
            throw;
        }
    }
}