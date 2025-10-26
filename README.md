# Todo Web App

A full-stack todo application with Laravel backend API and React frontend, fully containerized with Docker.

## 🏗️ Architecture

- **Backend**: Laravel API with PHP 8.2 and Apache
- **Frontend**: React SPA built with Vite and served with Nginx
- **Database**: MySQL 8.0 with persistent storage
- **Containerization**: Docker with docker-compose orchestration

## 🚀 Quick Start

### Prerequisites

- Docker Desktop installed and running
- Git (to clone the repository)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd todo_web_app
```

### 2. Start the Application

```bash
# Build and start all containers
docker-compose up --build
```

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **MySQL Database**: localhost:3306

## 📋 Services

### Backend (Laravel)
- **Port**: 8000
- **Features**: 
  - PHP 8.2 with Apache
  - MySQL database connection
  - RESTful API endpoints
  - Automatic migrations

### Frontend (React)
- **Port**: 3000
- **Features**: 
  - React with Vite build system
  - Served by Nginx
  - Modern UI with Tailwind CSS

### MySQL Database
- **Port**: 3306
- **Database**: `todo_app`
- **User**: `todo_user`
- **Password**: `todo_password`
- **Root Password**: `rootpassword`

## 🛠️ Development Commands

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

### Run Laravel Commands
```bash
# Run migrations
docker-compose exec backend php artisan migrate

# Access Laravel Tinker
docker-compose exec backend php artisan tinker

# Clear cache
docker-compose exec backend php artisan cache:clear
```

### Access MySQL Database
```bash
# Connect to MySQL
docker-compose exec mysql mysql -u todo_user -ptodo_password todo_app

# Or as root
docker-compose exec mysql mysql -u root -prootpassword
```

### Stop and Clean Up
```bash
# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: This will delete all data)
docker-compose down -v

# Rebuild everything from scratch
docker-compose down -v
docker-compose up --build
```

## 🧪 Testing the Setup

### 1. Check if Containers are Running
```bash
docker-compose ps
```

You should see 3 containers running:
- `todo_web_app_backend_1`
- `todo_web_app_frontend_1` 
- `todo_web_app_mysql_1`

### 2. Test Backend API
```bash
# Test if Laravel is responding
curl http://localhost:8000

# Test API endpoints (if you have them)
curl http://localhost:8000/api/tasks
```

### 3. Test Frontend
Open your browser and go to http://localhost:3000

### 4. Test Database Connection
```bash
# Connect to MySQL
docker-compose exec mysql mysql -u todo_user -ptodo_password todo_app

# In MySQL, run:
SHOW TABLES;
```

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Check what's using the ports
   netstat -tulpn | grep :3000
   netstat -tulpn | grep :8000
   netstat -tulpn | grep :3306
   ```

2. **Container Won't Start**
   ```bash
   # Check logs
   docker-compose logs backend
   docker-compose logs frontend
   docker-compose logs mysql
   ```

3. **Database Connection Issues**
   ```bash
   # Wait for MySQL to be ready
   docker-compose exec mysql mysqladmin ping -h localhost
   
   # Reset database
   docker-compose exec backend php artisan migrate:fresh
   ```

4. **Permission Issues**
   ```bash
   # Fix Laravel permissions
   docker-compose exec backend chown -R www-data:www-data /var/www/html/storage
   docker-compose exec backend chmod -R 755 /var/www/html/storage
   ```

### Reset Everything
```bash
# Nuclear option - removes everything
docker-compose down -v
docker system prune -a
docker-compose up --build
```

## 📁 Project Structure

```
todo_web_app/
├── backend/                 # Laravel API
│   ├── app/
│   ├── config/
│   ├── database/
│   ├── routes/
│   ├── Dockerfile
│   └── .dockerignore
├── frontend/               # React App
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── .dockerignore
├── docker/                 # Docker configurations
│   ├── mysql/
│   └── nginx/
├── docker-compose.yml      # Main orchestration file
├── .dockerignore
└── README.md
```

## 🔧 Environment Variables

The application uses these environment variables (set in docker-compose.yml):

- `DB_CONNECTION=mysql`
- `DB_HOST=mysql`
- `DB_DATABASE=todo_app`
- `DB_USERNAME=todo_user`
- `DB_PASSWORD=todo_password`

## 📚 API Documentation

Once running, you can access:
- Backend API: http://localhost:8000/api
- Laravel routes: Check `backend/routes/api.php`

