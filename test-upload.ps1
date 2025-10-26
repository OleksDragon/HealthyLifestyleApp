# Тест завантаження зображень спеціалістів
Write-Host "🔍 Перевірка зображень спеціалістів..." -ForegroundColor Green

# Перевіряємо наявність зображень
$imagesPath = "D:\Diploma\Clone\HealthyLifestyleApp\backend\Assets\specialists-img"
if (Test-Path $imagesPath) {
    Write-Host "✅ Папка зображень знайдена: $imagesPath" -ForegroundColor Green
    
    $images = Get-ChildItem $imagesPath -Filter "card-*.png"
    Write-Host "📁 Знайдено зображень: $($images.Count)" -ForegroundColor Yellow
    
    foreach ($image in $images) {
        Write-Host "  - $($image.Name)" -ForegroundColor Cyan
    }
} else {
    Write-Host "❌ Папка зображень не знайдена: $imagesPath" -ForegroundColor Red
}

# Перевіряємо environment variable
$envPath = $env:SPECIALIST_IMAGES_PATH
if ($envPath) {
    Write-Host "✅ Environment variable встановлено: $envPath" -ForegroundColor Green
} else {
    Write-Host "❌ Environment variable не встановлено" -ForegroundColor Red
}

# Тест API endpoint
Write-Host "🌐 Тестування API endpoint..." -ForegroundColor Green
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/SpecialistImage/upload-all-auto" -Method POST -Headers @{"Content-Type"="application/json"} -TimeoutSec 10
    Write-Host "✅ API відповідь: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "📄 Відповідь: $($response.Content)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Помилка API: $($_.Exception.Message)" -ForegroundColor Red
}