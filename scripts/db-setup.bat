@echo off
REM SalesAIde Database Setup Script for Windows
REM This script helps set up the local PostgreSQL database for development

setlocal enabledelayedexpansion

REM Configuration
set DB_NAME=salesaide
set DB_USER=salesaide
set DB_PASSWORD=salesaide_password
set DB_HOST=localhost
set DB_PORT=5432

REM Colors (limited support in Windows)
set RED=[91m
set GREEN=[92m
set YELLOW=[93m
set BLUE=[94m
set NC=[0m

echo %BLUE%================================%NC%
echo %BLUE%  SalesAIde Database Setup%NC%
echo %BLUE%================================%NC%
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo %RED%Error: Docker is not installed. Please install Docker Desktop first.%NC%
    exit /b 1
)

docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo %RED%Error: Docker Compose is not installed. Please install Docker Compose first.%NC%
    exit /b 1
)

echo %GREEN%Docker and Docker Compose are available%NC%

REM Check if .env file exists
if not exist ".env" (
    echo %YELLOW%Creating .env file from .env.local template...%NC%
    copy .env.local .env >nul
    echo %GREEN%.env file created%NC%
    echo %YELLOW%Please review and update the .env file if needed%NC%
) else (
    echo %GREEN%.env file already exists%NC%
)

REM Parse command line arguments
set COMMAND=%1
set MODE=%2
set OPTION=%3

if "%COMMAND%"=="setup" goto setup
if "%COMMAND%"=="start" goto start
if "%COMMAND%"=="stop" goto stop
if "%COMMAND%"=="restart" goto restart
if "%COMMAND%"=="status" goto status
if "%COMMAND%"=="logs" goto logs
if "%COMMAND%"=="shell" goto shell
if "%COMMAND%"=="reset" goto reset
if "%COMMAND%"=="help" goto help
if "%COMMAND%"=="" goto help
goto unknown

:setup
echo %YELLOW%Setting up database...%NC%
call :start_database %MODE% %OPTION%
echo %YELLOW%Running database migrations...%NC%
npm run db:push
echo %GREEN%Database setup completed!%NC%
goto end

:start
call :start_database %MODE% %OPTION%
goto end

:start_database
set MODE_ARG=%1
set OPTION_ARG=%2

if "%MODE_ARG%"=="dev" (
    echo %YELLOW%Starting development database with sample data...%NC%
    docker-compose -f docker-compose.dev.yml up -d postgres-dev
    
    echo %YELLOW%Waiting for database to be ready...%NC%
    timeout /t 10 /nobreak >nul
    
    echo %GREEN%Development database is ready!%NC%
    echo %GREEN%Database URL: postgresql://%DB_USER%:salesaide_dev_password@localhost:5433/salesaide_dev%NC%
    
    if "%OPTION_ARG%"=="pgadmin" (
        echo %YELLOW%Starting pgAdmin...%NC%
        docker-compose -f docker-compose.dev.yml up -d pgadmin-dev
        echo %GREEN%pgAdmin is available at http://localhost:8081%NC%
        echo %YELLOW%Login: admin@salesaide.local / admin123%NC%
    )
) else (
    echo %YELLOW%Starting production-style database...%NC%
    docker-compose up -d postgres
    
    echo %YELLOW%Waiting for database to be ready...%NC%
    timeout /t 10 /nobreak >nul
    
    echo %GREEN%Database is ready!%NC%
    echo %GREEN%Database URL: postgresql://%DB_USER%:%DB_PASSWORD%@localhost:%DB_PORT%/%DB_NAME%%NC%
    
    if "%OPTION_ARG%"=="pgadmin" (
        echo %YELLOW%Starting pgAdmin...%NC%
        docker-compose --profile dev up -d pgadmin
        echo %GREEN%pgAdmin is available at http://localhost:8080%NC%
        echo %YELLOW%Login: admin@salesaide.local / admin123%NC%
    )
)
goto :eof

:stop
if "%MODE%"=="dev" (
    docker-compose -f docker-compose.dev.yml down
) else (
    docker-compose down postgres pgadmin redis
)
echo %GREEN%Database services stopped%NC%
goto end

:restart
if "%MODE%"=="dev" (
    docker-compose -f docker-compose.dev.yml restart postgres-dev
) else (
    docker-compose restart postgres
)
echo %GREEN%Database services restarted%NC%
goto end

:status
echo %YELLOW%Database status:%NC%
if "%MODE%"=="dev" (
    docker-compose -f docker-compose.dev.yml ps
) else (
    docker-compose ps postgres pgadmin
)
goto end

:logs
if "%MODE%"=="dev" (
    docker-compose -f docker-compose.dev.yml logs -f postgres-dev
) else (
    docker-compose logs -f postgres
)
goto end

:shell
if "%MODE%"=="dev" (
    docker-compose -f docker-compose.dev.yml exec postgres-dev psql -U salesaide -d salesaide_dev
) else (
    docker-compose exec postgres psql -U salesaide -d salesaide
)
goto end

:reset
echo %RED%WARNING: This will destroy all data in the database!%NC%
set /p CONFIRM="Are you sure? (y/N): "
if /i "%CONFIRM%"=="y" (
    if "%MODE%"=="dev" (
        docker-compose -f docker-compose.dev.yml down -v
        docker-compose -f docker-compose.dev.yml up -d postgres-dev
    ) else (
        docker-compose down -v postgres
        docker-compose up -d postgres
    )
    echo %GREEN%Database reset completed%NC%
) else (
    echo %GREEN%Database reset cancelled%NC%
)
goto end

:help
echo Usage: %0 [COMMAND] [OPTIONS]
echo.
echo Commands:
echo   setup [dev^|prod] [pgadmin]  Set up database (default: prod)
echo   start [dev^|prod] [pgadmin]  Start database services
echo   stop [dev^|prod]             Stop database services
echo   restart [dev^|prod]          Restart database services
echo   status [dev^|prod]           Show database status
echo   logs [dev^|prod]             Show database logs
echo   shell [dev^|prod]            Connect to database shell
echo   reset [dev^|prod]            Reset database (WARNING: destroys data)
echo   help                         Show this help
echo.
echo Examples:
echo   %0 setup dev pgadmin         # Set up development database with pgAdmin
echo   %0 start prod                # Start production database
echo   %0 shell dev                 # Connect to development database
goto end

:unknown
echo %RED%Unknown command: %COMMAND%%NC%
goto help

:end
endlocal
