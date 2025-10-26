# Base Image
FROM php:8.2-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Enable Apache mod_rewrite for Laravel routing
RUN a2enmod rewrite

# Install Composer (from official Composer image)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy the entire application code first BEFORE installing dependencies
COPY . .

# Install PHP dependencies AFTER copying the code
RUN composer install --optimize-autoloader

# Install Node & npm dependencies for Laravel Vite build (if using Vite)
RUN apt-get update && apt-get install -y nodejs npm
RUN npm install && npm run build

# Set correct permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Create .env file with basic configuration
RUN echo 'APP_NAME="Todo App"\n\
APP_ENV=production\n\
APP_KEY=\n\
APP_DEBUG=false\n\
APP_URL=http://localhost\n\
\n\
DB_CONNECTION=mysql\n\
DB_HOST=mysql\n\
DB_PORT=3306\n\
DB_DATABASE=todo_app\n\
DB_USERNAME=todo_user\n\
DB_PASSWORD=todo_password\n\
\n\
CACHE_DRIVER=file\n\
SESSION_DRIVER=file\n\
QUEUE_CONNECTION=sync\n\
\n\
MAIL_MAILER=log\n\
VITE_APP_NAME="${APP_NAME}"' > .env \
    && php artisan key:generate

# Configure Apache for Laravel
RUN echo '<VirtualHost *:80>\n\
    DocumentRoot /var/www/html/public\n\
    <Directory /var/www/html/public>\n\
        AllowOverride All\n\
        Require all granted\n\
    </Directory>\n\
</VirtualHost>' > /etc/apache2/sites-available/000-default.conf

# Expose port 80
EXPOSE 80

# Start Apache server
CMD ["apache2-foreground"]
