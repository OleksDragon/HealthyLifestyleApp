#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/HealthyLifestyle.Api/HealthyLifestyle.Api.csproj", "src/HealthyLifestyle.Api/"]
COPY ["src/HealthyLifestyle.Application/HealthyLifestyle.Application.csproj", "src/HealthyLifestyle.Application/"]
COPY ["src/HealthyLifestyle.Core/HealthyLifestyle.Core.csproj", "src/HealthyLifestyle.Core/"]
COPY ["src/HealthyLifestyle.Infrastructure/HealthyLifestyle.Infrastructure.csproj", "src/HealthyLifestyle.Infrastructure/"]
RUN dotnet restore "./src/HealthyLifestyle.Api/./HealthyLifestyle.Api.csproj"
COPY . .
WORKDIR "/src/src/HealthyLifestyle.Api"
RUN dotnet build "./HealthyLifestyle.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./HealthyLifestyle.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "HealthyLifestyle.Api.dll"]