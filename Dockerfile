################################
# stage 2: PHP + Laravel Setup #
################################
FROM php:8.2-cli

# 1) Install system deps for PHP extensions
RUN apt-get update && apt-get install -y \
    zip unzip libzip-dev \
    libicu-dev libonig-dev libxml2-dev libcurl4-openssl-dev \
  && docker-php-ext-configure zip \
  && docker-php-ext-install \
    pdo_mysql zip intl bcmath mbstring xml curl

WORKDIR /app

# 2) Copy *all* of your Laravel app (including .env.example)
COPY backend/ ./

# 3) Bring .env into place
RUN cp .env.example .env

# 4) Install Composer globally & your PHP deps
RUN php -r "copy('https://getcomposer.org/installer','composer-setup.php');" \
 && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
 && composer install --no-dev --optimize-autoloader

# 5) Copy your Angular build into public/
COPY --from=frontend-builder /app/frontend/dist/my-app/browser public

# 6) Now that .env exists, generate the APP_KEY
RUN php artisan key:generate --ansi

# 7) Expose & run
EXPOSE 8080
CMD ["php","-S","0.0.0.0:8080","-t","public"]
