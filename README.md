# Todo Web App

Full-stack todo application with Laravel backend, React frontend, and MySQL database - fully containerized with Docker.


## 🚀 Getting Started

### Prerequisites
- **Docker Desktop** (Download from [docker.com](https://www.docker.com/products/docker-desktop/))
- **Git** (Download from [git-scm.com](https://git-scm.com/))

### Setup (5 Steps)

1. **Clone and Navigate**
   ```bash
   git clone <your-repo-url>
   cd todo_web_app
   ```

2. **Start Docker Desktop**
   - Open Docker Desktop, wait for green icon

3. **Create Database** (in your terminal)
   
   **Option A: If you have MySQL installed locally:**
   ```bash
   mysql -u root -p
   CREATE DATABASE todo_app;
   CREATE USER 'todo_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON todo_app.* TO 'todo_user'@'localhost';
   FLUSH PRIVILEGES;
   ```
   
   **Option B: If MySQL command not found, use Docker MySQL instead:**
   ```bash
   # Skip this step and go to step 5
   # The app will use Docker MySQL automatically
   ```

4. **Configure** (edit the file)
   
   **If using local MySQL:** Open `docker-compose.yml`, change these 2 lines in backend environment:
   ```yaml
   - DB_HOST=host.docker.internal
   - DB_PASSWORD=your_password
   ```
   
   **If using Docker MySQL:** Skip this step - no changes needed!

#### 5. Run the Application
```bash
# Build and start all containers
docker-compose up --build

# Run database migrations
docker-compose exec backend php artisan migrate
```

### Access Your Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Database**: localhost:3306

## 🏗️ Architecture

- **Backend**: Laravel API (PHP 8.2 + Apache) - Port 8000
- **Frontend**: React SPA (Vite + Nginx) - Port 3000  
- **Database**: MySQL 8.0 - Port 3306

## 🛠️ Commands

```bash
# View logs
docker-compose logs -f

# Run Laravel commands
docker-compose exec backend php artisan migrate
docker-compose exec backend php artisan tinker

# Stop everything
docker-compose down

# Rebuild
docker-compose up --build
```

## 🐛 Troubleshooting

**Port conflicts?**
```bash
netstat -ano | findstr :3000  # Windows
netstat -tulpn | grep :3000   # Linux/Mac
```

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

## 📚 API Documentation

Once running, you can access:
- Backend API: http://localhost:8000/api
- Laravel routes: Check `backend/routes/api.php`

