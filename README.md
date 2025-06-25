# 📝 Task Manager

A full-stack task management web app built with Angular and Laravel. Users can register, log in, and manage their tasks securely. The app supports user authentication, CRUD operations, and responsive UI — perfect for personal productivity or as a lightweight project management tool.

---

## 🚀 Live Demo

- 🌐 **Frontend App:** [nathaniel-task-manager-app.netlify.app](https://nathaniel-task-manager-app.netlify.app)
- 🔗 **Backend API:** [melodious-recreation-production.up.railway.app](https://melodious-recreation-production.up.railway.app)

---

## ⚙️ Tech Stack

**Frontend:**  
- Angular  
- Bootstrap

**Backend:**  
- Laravel (PHP)  
- Laravel Sanctum (token-based authentication)  
- MySQL

---

## ✅ Features

- User registration & login
- Secure authentication using Laravel Sanctum
- CRUD operations for personal tasks
- Protected API routes
- Mobile-responsive frontend

---

## 📦 Local Setup Instructions

### 🔧 Requirements

- [XAMPP](https://www.apachefriends.org/index.html) — to run MySQL locally  
- [phpMyAdmin](http://localhost/phpmyadmin) — GUI for MySQL (comes with XAMPP)
- [Composer](https://getcomposer.org/) — PHP dependency manager  
- [Node.js & npm](https://nodejs.org/) — JavaScript runtime  
- [Angular CLI](https://angular.io/cli) — Angular dev tool  
- [PHP 8.x](https://www.php.net/) — for Laravel

### 🔙 Backend Setup (Laravel)

```bash
# 1. Navigate to the backend folder
cd backend

# 2. Install dependencies
composer install

# 3. Copy and configure environment variables
cp .env.example .env

# 4. Set your database credentials in .env
# Example:
# DB_DATABASE=your_db_name
# DB_USERNAME=root
# DB_PASSWORD=your_password

#4. Configure MySQL
If you're using XAMPP and phpMyAdmin, start XAMPP and:
 1. Click Start on Apache and MySQL
 2. Go to http://localhost/phpmyadmin
 3. Update your .env file like so:
  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=task_manager
  DB_USERNAME=root
  DB_PASSWORD=          # (Leave empty if XAMPP root has no password)

# 5. Generate application key
php artisan key:generate

# 6. Run database migrations
php artisan migrate

# 7. Serve the API (By default, Laravel will run at http://localhost:8000)
php artisan serve

### 🎨 Frontend Setup

```bash
# 1. Go to the frontend folder
cd frontend

# 2. Install Angular dependencies
npm install

# 3. Start the Angular development server (This will automatically open the app at http://localhost:4200)
ng serve --open

### 🧪 API Routes

All routes (except `/register` and `/login`) require authentication via a Bearer token.

| Method | Endpoint       | Description               | Auth Required |
|--------|----------------|---------------------------|---------------|
| POST   | `/register`    | Register new user         | ❌            |
| POST   | `/login`       | Log in and get token      | ❌            |
| POST   | `/logout`      | Log out                   | ✅            |
| GET    | `/user`        | Get authenticated user    | ✅            |
| GET    | `/task`        | Get all user tasks        | ✅            |
| POST   | `/task`        | Create a new task         | ✅            |
| PUT    | `/task/{id}`   | Update an existing task   | ✅            |
| DELETE | `/task/{id}`   | Delete a task             | ✅            |
