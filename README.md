# Blog-Platform

A simple blog platform backend built with Node.js, Express, and MySQL. This project provides RESTful APIs to manage users, posts, and tags with authentication feature.

---

## Features

- User registration and login with JWT-based authentication
- Create, read, update, and delete (CRUD) operations for blog posts
- Tag management for posts
- Password hashing for security
- Error handling middleware

---

## Tech Stack

- Node.js
- Express.js
- MySQL (using `mysql2` package)
- JSON Web Tokens (JWT)
- bcrypt for password hashing
- dotenv for environment variable management

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MySQL Workbench](https://dev.mysql.com/downloads/installer/) installed and running

### Step-1: Clone the repository

```bash
git clone https://github.com/mehtakevan/Blog-Platform.git
cd Blog-Platform
```
### Step-2: Install dependencies

```bash
npm install
```
### Step-3: Set the environment variables
Create a .env file in the root directory similar to .env.example:

### Step-4: Database Setup (Using MySQL Workbench)

1. Launch **MySQL Workbench** and connect to your local MySQL instance.
2. Open the provided `setup.sql` file located in the project root.
3. Execute the script using the ⚡ (lightning bolt) button or press **Ctrl + Shift + Enter**.
4. The script will:
   - Create the required database and tables.
   - Populate necessary data for tags.

Once completed, your database will be ready to support the backend APIs.

### Step-5: Start the server
```bash
npm start
```

# API endpoints
### 🔐 Authentication

Some endpoints are protected and require a JWT token.

### 🧾 How to get the token

1. Use the `POST /api/users/login` endpoint.
2. Provide a valid email and password in the request body:
   ```json
   {
     "email": "user@example.com",
     "password": "yourpassword"
   }
3. The response will include a JWT token (as a string).

### 🔐 How to use the token
For all protected routes (e.g., creating, updating, deleting posts), add this header to your requests:
```makefile
Authorization: Bearer <your_token>
```
Replace <your_token> with the JWT received from the login response.

## User APIs
### 1. Register a New User

**POST** `/api/users`

#### Request Body
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```
### 2. Login
**POST** `/api/users/login`

#### Request Body
```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

## Post APIs
### 1. Get All Posts
**GET** `/api/posts`

### 2. Get Post by ID
**GET** `/api/posts/:id`

### 3. Create a New Post
**POST** `/api/posts`
🔒 Requires Authentication

#### Request Body
```json
{
  "title": "New Blog",
  "content": "Content goes here...",
  "tagIds": [1, 2]
}
```

### 4. Update a Post
**PUT** `/api/posts/:id`
🔒 Requires Authentication

#### Request Body (any of these fields)
```json
{
  "title": "Updated Title",
  "content": "Updated Content",
  "tagIds": [1]
}
```
### 5. Delete a Post
**DELETE** `/api/posts/:id`
🔒 Requires Authentication

## Tag APIs
### 1. Get All Tags
**GET** `/api/tags`
