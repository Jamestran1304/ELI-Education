# ELI Education Platform

A modern education platform built with React and Node.js.

## Project Structure

```
eli-edu/
├── eli-edu-frontend/     # React frontend
├── eli-edu-backend/      # Node.js backend
├── package.json          # Root package.json
└── README.md            # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd eli-edu
```

2. Install dependencies for all projects:
```bash
npm run install:all
```

3. Set up environment variables:
   - Create `.env` file in `eli-edu-backend` directory
   - Create `.env` file in `eli-edu-frontend` directory
   - See `.env.example` files in each directory for required variables

4. Start the development servers:
```bash
npm start
```

This will start both frontend and backend servers concurrently:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Available Scripts

- `npm start` - Start both frontend and backend servers
- `npm run start:frontend` - Start only frontend server
- `npm run start:backend` - Start only backend server
- `npm run install:all` - Install dependencies for all projects
- `npm run build` - Build frontend for production
- `npm test` - Run tests for both frontend and backend

## Features

- Course management
- User authentication
- Course search and filtering
- Course statistics
- Teacher profiles
- Course schedules
- Related courses
- Vietnamese language support

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 