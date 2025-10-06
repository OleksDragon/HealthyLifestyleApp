HealthyLifestyle - Запуск с использованием Docker Compose
Этот проект включает в себя бэкенд на ASP.NET Core, фронтенд на React и базу данных SQL Server, упакованные в Docker-контейнеры для легкого развертывания и запуска.

Содержание
Предварительные требования

Настройка проекта

Запуск приложения с Docker Compose

Доступ к приложению

Подключение к базе данных SQL Server

Остановка приложения

Устранение неполадок

1. Предварительные требования
   Для запуска этого проекта вам понадобится следующее программное обеспечение:

Git: Для клонирования репозитория.

Скачать Git

Docker Desktop: Включает Docker Engine и Docker Compose. Убедитесь, что он запущен и работает.

Скачать Docker Desktop

2. Настройка проекта
   Клонируйте репозиторий:
   Откройте терминал (например, PowerShell или Git Bash) и выполните:

git clone https://github.com/OleksDragon/HealthyLifestyleApp.git
cd HealthyLifestyle

Создайте файл .env:
В корневой директории проекта (HealthyLifestyle/) создайте файл с именем .env. Этот файл будет содержать переменные окружения для вашей базы данных и JWT-токенов.

Скопируйте следующее содержимое в ваш файл .env:

SA_PASSWORD=118MtdRtra8LbzVSC

MSSQL_DB=HealthyLifestyleDb

MSSQL_USER=sa

MSSQL_PORT=1433

JWT_KEY=72O3^G4BUrXY$T:LM*7Asdhtp^vpCt>l1CDK4DMua1<+SaUC4viz\04:HnLkLGSh

JWT_ISSUER=HealthyLifestyleApi

JWT_AUDIENCE=HealthyLifestyleClients

REACT_APP_API_URL=http://localhost:5000

GOOGLE_CLIENT_ID=596782705647-sa9h8d11i8grjh3jukglih9c9hnsp3co.apps.googleusercontent.com

GOOGLE_CLIENT_SECRET=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
MINIO_ACCESS_KEY=VoKSFVKFGlQRLeBJFzNHTJwy
MINIO_SECRET_KEY=YRs3EsL7BtDHGaIxlBVsBTxGm3rX9m1

MINIO_ACCESS_KEY=VoKSFVKFGlQRLeBJFzNHTJwy

MINIO_SECRET_KEY=YRs3EsL7BtDHGaIxlBVsBTxGm3rX9m1

Важно: Для продакшн-среды нужно использовать более надежные и безопасные методы управления секретами.

3. Запуск приложения с Docker Compose
   После настройки файла .env вы можете запустить все сервисы с помощью Docker Compose.

Откройте терминал в корневой директории проекта (HealthyLifestyle/).

Запустите Docker Compose:
Эта команда соберет образы и запустит все контейнеры.

docker-compose up --build

--build: Убедитесь, что образы пересобираются, чтобы включить последние изменения в коде или Dockerfile.

Подождите, пока все сервисы запустятся. Вы увидите логи от healthy_mssql, healthy_backend и healthy_frontend.

Ожидаемый вывод в логах healthy_backend:
Вы должны увидеть сообщения о применении миграций Entity Framework Core и о том, что приложение ASP.NET Core начало слушать запросы:

healthy_backend | info: Microsoft.Hosting.Lifetime[14]
healthy_backend | Now listening on: http://[::]:8080
healthy_backend | info: Microsoft.Hosting.Lifetime[0]
healthy_backend | Application started. Press Ctrl+C to shut down.

(Обратите внимание на порт 8080 внутри контейнера, который маппится на 5000 на вашем хосте).

4. Доступ к приложению
   После успешного запуска контейнеров вы можете получить доступ к приложению:

Фронтенд (React):
Откройте в браузере: http://localhost:3000

Бэкенд (ASP.NET Core API) - Swagger UI:
Откройте в браузере: http://localhost:5000/swagger
Здесь вы сможете просмотреть документацию API и протестировать эндпоинты.

5. Подключение к базе данных SQL Server
   Вы можете подключиться к базе данных SQL Server, работающей в контейнере, используя любой SQL-клиент (например, SQL Server Management Studio (SSMS), Azure Data Studio, DBeaver).

Данные для подключения:

Имя сервера (Server Name): localhost,1433 или 127.0.0.1,1433

Тип аутентификации (Authentication): SQL Server Authentication

Имя пользователя (Login): sa

Пароль (Password): SUe3qjEm4c7fEYrqd (из вашего .env файла)

Имя базы данных (Database Name): HealthyLifestyleDb (из вашего .env файла)

Пример подключения (для SSMS/Azure Data Studio):

Запустите ваш SQL-клиент.

В окне подключения к серверу введите localhost,1433 в поле "Server name".

Выберите "SQL Server Authentication" в качестве типа аутентификации.

Введите sa в поле "Login" и 118MtdRtra8LbzVSC в поле "Password".

Нажмите "Connect".

После успешного подключения вы сможете просматривать схемы, таблицы и данные вашей базы данных HealthyLifestyleDb.

6. Остановка приложения
   Чтобы остановить все запущенные Docker-контейнеры и удалить их (но сохранить тома с данными базы данных):

docker-compose down

7. Устранение неполадок
   Контейнер healthy_mssql показывает (unhealthy):
   Это часто бывает ложным срабатыванием healthcheck. Если healthy_backend успешно запускается и подключается к базе данных, то mssql работает нормально, и вы можете игнорировать этот статус.

Порт уже используется:
Если вы видите ошибку "port is already in use", это означает, что порт 5000 (для бэкенда) или 3000 (для фронтенда) уже занят другим приложением на вашем хост-компьютере. Вы можете изменить эти порты в файле docker-compose.yml (например, на "5001:8080" для бэкенда).

Проблемы с запуском бэкенда/миграциями:
Если бэкенд не запускается или не применяет миграции, проверьте логи:

docker-compose logs backend

Ищите сообщения об ошибках. Если вы изменили Dockerfile и столкнулись с ошибками, попробуйте выполнить полную пересборку:

docker-compose down
docker-compose build --no-cache backend # Пересобрать без использования кэша
docker-compose up --build

Error response from daemon: failed to create task for container: ... executable file not found in $PATH:
Эта ошибка указывает на то, что Docker не может найти исполняемый файл (например, bash или sh) внутри контейнера. Это может быть связано с повреждением образа или несовместимостью. Попробуйте выполнить полную очистку Docker-системы:

docker-compose down
docker rmi healthylifestyle-backend:latest # Удалить образ бэкенда
docker system prune --all --volumes -f # Очистить все неиспользуемые данные Docker (осторожно!)
docker-compose up --build # Собрать и запустить заново
