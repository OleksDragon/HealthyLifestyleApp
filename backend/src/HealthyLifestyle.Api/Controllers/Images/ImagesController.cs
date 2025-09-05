using HealthyLifestyle.Application.Interfaces.ObjectStorage;
using Microsoft.AspNetCore.Mvc;

namespace HealthyLifestyle.Api.Controllers.Images;

[ApiController]
[Route("api/images")]
public class ImagesController : ControllerBase
{
    private readonly IObjectStorageService _storageService;

    // Конструктор, який отримує IObjectStorageService через Dependency Injection
    public ImagesController(IObjectStorageService storageService)
    {
        _storageService = storageService;
    }

    /// <summary>
    /// Загружает файл в объектное хранилище.
    /// </summary>
    /// <param name="file">Файл, который нужно загрузить.</param>
    /// <returns>URL загруженного файла.</returns>
    [HttpPost("upload")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UploadImage(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("Файл не найден.");
        }

        // Генерируем уникальное имя для файла, чтобы избежать конфликтов
        var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";

        // Открываем поток для чтения файла
        using (var stream = file.OpenReadStream())
        {
            try
            {
                var fileUrl = await _storageService.UploadFileAsync(stream, fileName, file.ContentType);
                return Ok(new { url = fileUrl });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Произошла ошибка при загрузке файла: {ex.Message}");
            }
        }
    }

    /// <summary>
    /// Получает файл из объектного хранилища.
    /// </summary>
    /// <param name="fileName">Имя файла.</param>
    /// <returns>Файл для скачивания или отображения.</returns>
    [HttpGet("{fileName}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetImage(string fileName)
    {
        try
        {
            var stream = await _storageService.GetFileAsync(fileName);
            return File(stream, "application/octet-stream", fileName);
        }
        catch (Minio.Exceptions.MinioException)
        {
            return NotFound("Файл не найден.");
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Произошла ошибка при получении файла: {ex.Message}");
        }
    }
}