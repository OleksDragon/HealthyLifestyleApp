namespace HealthyLifestyle.Application.Services.ObjectStorage
{
    // Класс для хранения настроек MinIO, загружаемых из конфигурации.;

    public class MinioSettings
    {
        public required string Endpoint { get; set; }
        public required string AccessKey { get; set; }
        public required string SecretKey { get; set; }
        public required string BucketName { get; set; }
    }
}