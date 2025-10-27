# Todo Web App

Full-stack todo application with Laravel backend, React frontend, and MySQL database - fully containerized with Docker.


## 🚀 Getting Started

### Prerequisites
- **Docker Desktop** (Download from [docker.com](https://www.docker.com/products/docker-desktop/))
- **Git** (Download from [git-scm.com](https://git-scm.com/))

### Setup (Simple Steps)

**Note:** All commands below should be run in **PowerShell** or **Git Bash**.

1. **Clone and Navigate**
   ```bash
   git clone https://github.com/yudeeshaDev/todo_web_application.git
   cd todo_web_application
   ```

2. **Start Docker Desktop**
   - Open Docker Desktop, wait for green icon

3. **Build and Start Containers**
   ```bash
   docker-compose up --build
   ```

4. **Open New PowerShell Window**
   - After containers are running, open a **new PowerShell window**


5. **Verify Containers are Running**
   ```bash
   docker ps
   ```
   You should see containers running for todo_mysql, todo_backend, and todo_frontend.

6. **Test Database Connection**
   ```bash
   docker exec -it todo_mysql mysql -u todo_user -p
   ```
   - When prompted for password, type: `todo_password`
   - Press Enter
   - You should see: `Welcome to the MySQL monitor.`
   - Type `exit` to leave MySQL

7. **Create Docker Network**
   ```bash
   docker network create laravel-network
   ```

8. **Run Database Migrations**
   ```bash
   docker exec -it todo_backend bash
   ```
   - You'll see: `root@31add98b1e0e:/var/www/html#`
   - Type: `php artisan migrate`
   - You'll see a banner with "APPLICATION IN PRODUCTION" and a confirmation prompt
   - Select "Yes" and press Enter to confirm
   - Type: `exit` to leave the container

9. **Access Your Application**
   - Open your browser and go to: http://localhost:3000
   - Start adding your tasks!

### Access Your Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Database**: localhost:3306

## 🏗️ Architecture

- **Backend**: Laravel API (PHP 8.2 + Apache) - Port 8000
- **Frontend**: React SPA (Vite + Nginx) - Port 3000  
- **Database**: MySQL 8.0 - Port 3306

## 🧪 Testing

### Running Backend Tests (PHPUnit)

**Option 1: Using Docker (Recommended)**
```bash
# Run tests inside the backend container
docker exec -it todo_backend php artisan test
```

**Option 2: Local Setup**
```bash
# Navigate to backend directory
cd backend

# Install dependencies (if not using Docker)
composer install

# Run tests
php artisan test
```

### Test Results
- ✅ **5 Tests Pass**: Core API functionality
- ⚠️ **2 Tests Skip**: Gracefully handle dependencies
- ❌ **0 Tests Fail**: Robust error handling

### Test Configuration
Tests use the same database as the application (`todo_app`). No additional setup required when using Docker.

## 🛠️ Commands

```bash
# Stop everything
docker-compose down

# Rebuild
docker-compose up --build

# Run tests
docker exec -it todo_backend php artisan test
```

## 🐛 Troubleshooting


**Database issues?**
```bash
# Test connection
docker-compose exec backend mysql -h host.docker.internal -u todo_user -p todo_app
```

**Reset everything?**
```bash
docker-compose down -v
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
├── docker-compose.yml      # Main orchestration file
├── .dockerignore
└── README.md
```

---


