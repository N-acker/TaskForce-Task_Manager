# 1) Build Angular
FROM node:18 AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

# 2) Prepare PHP + Laravel
FROM php:8.1-cli
RUN apt-get update && \
    apt-get install -y zip unzip libzip-dev && \
    docker-php-ext-configure zip && \
    docker-php-ext-install pdo_mysql zip

WORKDIR /app

# Install Composer
COPY backend/composer.json backend/composer.lock ./
RUN php -r "copy('https://getcomposer.org/installer','composer-setup.php');" && \
    php composer-setup.php --install-dir=/usr/local/bin --filename=composer && \
    composer install --no-dev --optimize-autoloader

# Copy Angular output into Laravel public
COPY --from=frontend-builder /app/frontend/dist/my-app/browser public

# Copy the rest of your Laravel code
COPY backend .

# Generate an app key (so Laravel config is valid)
RUN php artisan key:generate

# Expose the port Railway will route to
EXPOSE 8080

# Start the built-in PHP server, serving from public/
CMD php -S 0.0.0.0:${PORT:-8080} -t public
