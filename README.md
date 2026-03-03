# Smart Service Booking Platform

## 📖 Project Overview

The Smart Service Booking Platform is a responsive, full-stack web application designed to seamlessly connect users with professional services. It features a robust authentication system, role-based access control (RBAC), and dynamic dashboards for both customers and administrators to manage bookings in real-time.

## ✨ Key Features

- **Secure Authentication:** User registration and login utilizing encrypted passwords (bcrypt) and JSON Web Tokens (JWT) for session management.
- **Role-Based Dashboards:** Distinct UI and data access for standard Users (booking history) and system Admins (system-wide management).
- **Dynamic Service Catalog:** Real-time fetching and rendering of available services from the database.
- **Interactive Booking System:** Users can select services, choose appointment dates, and submit booking requests.
- **Admin Control Panel:** Administrators can view all system bookings and update their statuses (Pending, Approved, Completed).

## 🛠️ Technology Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (DOM Manipulation, Fetch API)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose (ODM)
- **Security & Middleware:** `bcryptjs`, `jsonwebtoken`, `cors`, `dotenv`

## 📁 Project Structure

```text
📦 smart-service-booking
 ┣ 📂 backend
 ┃ ┣ 📂 models
 ┃ ┣ 📂 routes
 ┃ ┣ 📂 middleware
 ┃ ┣ 📜 server.js
 ┃ ┗ 📜 .env
 ┗ 📂 frontend
   ┣ 📜 index.html
   ┣ 📜 login.html
   ┣ 📜 register.html
   ┣ 📜 dashboard.html
   ┣ 📜 admin.html
   ┣ 📜 style.css
   ┗ 📜 app.js
```

## 🔌API Reference Endpoints

### Authentication

- **POST /api/auth/register** - Create a new user account.

- **POST /api/auth/login** - Authenticate user and return JWT.

### Services

- **GET /api/services** - Retrieve all available services.

### Bookings

- **POST /api/bookings** - Create a new service booking (Requires Token).

- **GET /api/bookings/user** - Get logged-in user's booking history (Requires Token).

- **GET /api/bookings/admin** - Get all system bookings (Requires Token + Admin Role).

- **PUT /api/bookings/status** - Update the status of a specific booking (Requires Token + Admin Role).

## 🚀 Installation & Setup Guide

### 1. Prerequisites

Ensure you have the following installed on your local development machine:

- Node.js

- MongoDB (Local server or Atlas URI)

### 2. Environment Variables

Create a .env file in the root of your backend directory and add the following configuration:

```JavaScript

Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_jwt_key 3. Backend Initialization
Open your terminal and navigate to the backend directory.
```

### 3. Backend Initialization

- Open your terminal and navigate to the backend directory.

- Install the required Node dependencies:

```
Bash
npm install
Start the Express server:
```

- Start the Express server:

```
Bash
node server.js
The console should display "Server is running on port 5000" and "Connected to MongoDB successfully!"
```

### 4. Frontend Initialization

- No npm install is required for the vanilla frontend.

- Open the frontend folder.

- Launch the application by opening index.html in any modern web browser. For the best development experience, use the VS Code "Live Server" extension.

## 🔐 Testing Credentials

- To evaluate the Admin features and role-based access control, use the following credentials:

- Admin Email: admin@test.com

- Password: password123
