# 1) Build Angular
FROM node:18 AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

# 2) Prepare PHP + Laravel
FROM php:8.2-cli

# install system deps for PHP extensions
RUN apt-get update && apt-get install -y \
    zip unzip libzip-dev \
    libicu-dev libonig-dev libxml2-dev libcurl4-openssl-dev \
  && docker-php-ext-configure zip \
  && docker-php-ext-install \
    pdo_mysql zip intl bcmath mbstring xml curl

WORKDIR /app

# 1) Copy all Laravel code (so artisan exists)
COPY backend/ . 

# 2) Only now install Composer & your PHP deps
COPY backend/composer.json backend/composer.lock .  
RUN php -r "copy('https://getcomposer.org/installer','composer-setup.php');" \
 && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
 && composer install --no-dev --optimize-autoloader

# 3) Copy your prerendered Angular build into public/
COPY --from=frontend-builder /app/frontend/dist/my-app/browser public

# 4) Generate your APP_KEY
RUN php artisan key:generate

EXPOSE 8080

# 5) Serve the app
CMD ["php","-S","0.0.0.0:8080","-t","public"]

