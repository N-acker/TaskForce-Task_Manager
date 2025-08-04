#!/bin/bash
set -e

# --- 1. Build Angular Frontend ---
cd frontend
npm install
npm run build

# --- 2. Copy Angular Build to Laravel Public (SAFE!) ---
# Assumes build output is in: dist/my-app/browser/
cp -r dist/my-app/browser/* ../backend/public/

# --- 3. Build Laravel Backend ---
cd ../backend
composer install --no-dev --optimize-autoloader
php artisan config:cache
# php artisan migrate --force   # Uncomment this if you want to run migrations automatically

echo "✅ Angular frontend deployed to Laravel public!"
