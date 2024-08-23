# 🛠️ Junior Full-Stack Exam Project: Next.js & Flask

This project is a full-stack web application developed as part of a junior full-stack developer exam. It features a Next.js frontend, a Flask backend, and implements CRUD operations with JWT-based authentication.

## 📚 Table of Contents

- [🔧 Technologies Used](#technologies-used)
- [✨ Features](#features)
- [📖 Setup Instructions](#setup-instructions)
  - [🐍 Backend (Flask)](#backend-flask)
  - [⚛️ Frontend (Next.js)](#frontend-nextjs)
- [🔑 Environment Variables](#environment-variables)
- [🚀 Running the Application](#running-the-application)
- [📡 API Endpoints](#api-endpoints)
- [🔒 Authentication](#authentication)
- [🤝 Contributing](#contributing)
- [📜 License](#license)

## 🔧 Technologies Used

- **Frontend**: Next.js (React) ⚛️
- **Backend**: Flask (Python) 🐍
- **Database**: SQLite 🗄️
- **Authentication**: JWT (JSON Web Tokens) 🔐

## ✨ Features

- **🔒 User Authentication**: Sign-up, login, and JWT-based authentication.
- **📝 CRUD Operations**: Create, Read, Update, and Delete operations for the application’s data models.
- **📱 Responsive UI**: Developed using React components.
- **📡 API**: RESTful API built with Flask.

## 📖 Setup Instructions

### 🐍 Backend (Flask)

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Fingertips18/junior-fullstack-exam.git
   cd your-repo/backend
   ```

2. **Create a virtual environment and install dependencies**:

   ```bash
   py -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   ```

3. **Set up environment variables. Create a `.env` file in the backend directory:**:

   ```bash
   SECRET_KEY=your-secret-key

   ADMIN_USERNAME=Administrator
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=password123

   TEST_USERNAME=test
   TEST_EMAIL=test@example.com
   TEST_PASSWORD=password123
   ```

4. **Run the backend server**:
   ```bash
   py main.py
   ```

### ⚛️ Frontend (Next.js)

1. **Navigate to the frontend directory**:

   ```bash
   cd ../frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables. Create a `.env.local` file in the frontend directory:**:

   ```bash
   BASE_URL=http://localhost:5000  # Adjust the backend URL if necessary
   SECRET_KEY=your-secret-key
   ```

4. **Run the frontend server**:
   ```bash
   npm run dev
   ```

## 🔑 Environment Variables

The following environment variables should be set:

- **Backend** (`.env`):

  - `SECRET_KEY`: Secret key for JWT encryption.

  - `ADMIN_USERNAME`: Use for testing admin username.
  - `ADMIN_EMAIL`: Use for testing admin email.
  - `ADMIN_PASSWORD`: Use for testing admin password.

  - `TEST_USERNAME`: Use for testing test user username.
  - `TEST_EMAIL`: Use for testing test user email.
  - `TEST_PASSWORD`: Use for testing test user password.

- **Frontend** (`.env.local`):

  - `BASE_URL`: URL of the Flask API.

  - `SECRET_KEY`: Ensures that the data within the token has not been tampered with and confirms the authenticity of the token/user.

## 🚀 Running the Application

- **Backend**: `py main.py` or `flask run`

- **Frontend**: `npm run dev`

- Visit `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend.

## 📡 API Endpoints

- **Root**:

  - `GET /`: The root of the server

  - If no `token` is found, a `sign in form` will be show

- **Authentication**:

  - `POST /sign-up`: Register a new user.

  - `POST /sign-in`: Authenticate user and receive JWT.

  - `POST /refresh`: Refresh JWT.

- **Item CRUD Operations**:

  - `GET /api/items`: Retrieve all items.

  - `POST /api/items`: Create a new item.

  - `PUT /api/items/:id`: Update an existing item.

  - `DELETE /api/items/:id`: Delete an item.

- **User Operations** (for testing purposes)

  - `GET /api/users`: Retrieve all users

  - `DELETE /api/users/:id`: Delete a user

## 🔒 Authentication

This project uses JWT for secure authentication. Tokens are stored in cookies with `HttpOnly` and `SameSite` attributes for enhanced security.
Both the `frontend` and `backend` handle the verification and expiration of the token.

## 🤝 Contributing

Feel free to fork this repository and contribute by submitting a pull request. All contributions are welcome!

## Contributors

<a href="https://github.com/Fingertips18/scroll-wheel-date-picker/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Fingertips18/scroll-wheel-date-picker" />
</a>

_Ghian Tan_ @ _Fingertips_ ([Github](https://github.com/Fingertips18))

## 📜 License

This project is licensed under the MIT License.
