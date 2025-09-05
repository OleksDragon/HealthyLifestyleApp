namespace HealthyLifestyle.Application.Interfaces.ObjectStorage
{
    // Интерфейс для абстракции хранилища объектов.
    public interface IObjectStorageService
    {
        /// <summary>
        /// Загружает файл в хранилище.
        /// </summary>
        /// <param name="stream">Поток данных файла.</param>
        /// <param name="objectName">Имя файла (объекта) в хранилище.</param>
        /// <param name="contentType">MIME-тип файла.</param>
        /// <returns>URL загруженного файла.</returns>
        Task<string> UploadFileAsync(Stream stream, string objectName, string contentType);

        /// <summary>
        /// Получает файл из хранилища.
        /// </summary>
        /// <param name="objectName">Имя файла (объекта) в хранилище.</param>
        /// <returns>Поток данных файла.</returns>
        Task<Stream> GetFileAsync(string objectName);
    }
}