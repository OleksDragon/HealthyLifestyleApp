# Этап сборки
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Копируем файл решения
COPY HealthyLifestyleApp.sln .

# Копируем файлы проектов в правильные папки
# Это позволяет dotnet restore кэшировать зависимости
COPY src/HealthyLifestyle.Api/*.csproj src/HealthyLifestyle.Api/
COPY src/HealthyLifestyle.Application/*.csproj src/HealthyLifestyle.Application/
COPY src/HealthyLifestyle.Core/*.csproj src/HealthyLifestyle.Core/
COPY src/HealthyLifestyle.Infrastructure/*.csproj src/HealthyLifestyle.Infrastructure/

# Устанавливаем инструмент dotnet-ef
RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"

# Восстановление зависимостей для всех проектов в решении
RUN dotnet restore

# Копируем все остальные файлы исходного кода
COPY src/ src/

# Копируем папку Assets
COPY Assets/ Assets/

# Публикация конкретного проекта API
RUN dotnet publish "src/HealthyLifestyle.Api/HealthyLifestyle.Api.csproj" -c Release -o /out

# --- Этап запуска ---
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS runtime
WORKDIR /app

# Копируем опубликованный вывод из этапа сборки
COPY --from=build /out .

# Копируем папку Assets в контейнер
COPY --from=build /src/Assets /app/Assets



# Указываем, какой DLL файл запускать при старте контейнера
ENTRYPOINT ["dotnet", "HealthyLifestyle.Api.dll"]
