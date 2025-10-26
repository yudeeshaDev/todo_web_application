# Docker Setup for Todo Web App

This project is fully dockerized with separate containers for the Laravel backend and React frontend, orchestrated with Docker Compose.

## Architecture

- **Backend**: Laravel API with PHP 8.2 and Apache
- **Frontend**: React SPA built with Vite and served with Nginx
- **Reverse Proxy**: Nginx handles routing between frontend and backend
- **Database**: MySQL 8.0 with persistent storage

## Quick Start

### Development Environment

1. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   - Frontend: http://localhost
   - Backend API: http://localhost/api
   - Health check: http://localhost/health

### Production Environment

1. **Build and start production services:**
   ```bash
   docker-compose -f docker-compose.prod.yml up --build -d
   ```

## Services

### Backend (Laravel)
- **Port**: 8000
- **Features**: PHP 8.2, Apache, MySQL connection

### Frontend (React)  
- **Port**: 3000
- **Features**: React with Vite, served by Nginx

### MySQL Database
- **Port**: 3306
- **Database**: `todo_app`
- **User**: `todo_user` / **Password**: `todo_password`

## Commands

### View logs
```bash
docker-compose logs -f
```

### Run Laravel commands
```bash
docker-compose exec backend php artisan migrate
docker-compose exec backend php artisan tinker
```

### Access MySQL
```bash
docker-compose exec mysql mysql -u todo_user -ptodo_password todo_app
```

## Troubleshooting

### Reset everything
```bash
docker-compose down -v
docker-compose up --build
```

### Database issues
```bash
docker-compose exec backend php artisan migrate:fresh
```

