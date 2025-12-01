# ELI EDU Backend

Backend API for the ELI EDU educational platform built with Node.js, Express, and MongoDB.

## Features

- User authentication and authorization
- Course management
- Teacher profiles
- Student enrollment
- Course ratings and reviews
- File uploads
- Email notifications

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd eli-edu-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/eli-edu
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_app_password

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=uploads
```

4. Start the development server:
```bash
npm run dev
```

## API Documentation

### Authentication

#### Register User
- **POST** `/api/auth/register`
- Body:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "student"
  }
  ```

#### Login
- **POST** `/api/auth/login`
- Body:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### Get Current User
- **GET** `/api/auth/me`
- Headers: `Authorization: Bearer <token>`

#### Update Profile
- **PUT** `/api/auth/profile`
- Headers: `Authorization: Bearer <token>`
- Body:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "avatar": "avatar.jpg"
  }
  ```

#### Change Password
- **PUT** `/api/auth/change-password`
- Headers: `Authorization: Bearer <token>`
- Body:
  ```json
  {
    "currentPassword": "oldpassword",
    "newPassword": "newpassword"
  }
  ```

### Courses

#### Get All Courses
- **GET** `/api/courses`
- Query Parameters:
  - `page`: Page number
  - `limit`: Items per page
  - `category`: Filter by category
  - `level`: Filter by level
  - `search`: Search by title or description

#### Get Course Details
- **GET** `/api/courses/:id`

#### Create Course (Teacher/Admin only)
- **POST** `/api/courses`
- Headers: `Authorization: Bearer <token>`
- Body:
  ```json
  {
    "title": "Course Title",
    "description": "Course Description",
    "price": 99.99,
    "duration": 12,
    "level": "beginner",
    "category": "English"
  }
  ```

#### Update Course (Teacher/Admin only)
- **PUT** `/api/courses/:id`
- Headers: `Authorization: Bearer <token>`

#### Delete Course (Admin only)
- **DELETE** `/api/courses/:id`
- Headers: `Authorization: Bearer <token>`

### Teachers

#### Get All Teachers
- **GET** `/api/teachers`

#### Get Teacher Profile
- **GET** `/api/teachers/:id`

#### Update Teacher Profile
- **PUT** `/api/teachers/:id`
- Headers: `Authorization: Bearer <token>`

### Events

#### Get All Events
- **GET** `/api/events`

#### Create Event (Admin only)
- **POST** `/api/events`
- Headers: `Authorization: Bearer <token>`

## Error Handling

The API uses standard HTTP status codes and returns errors in the following format:

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error message (in development)"
}
```

## Security

- JWT authentication
- Password hashing with bcrypt
- Input validation
- Rate limiting
- CORS enabled
- Helmet security headers

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 