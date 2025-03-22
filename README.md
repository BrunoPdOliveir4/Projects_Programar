# Programar Com Você Mentorship Projects

This repository contains all projects developed during the Programar.com.vc mentorship program.

## Table of Contents

- [Projects](#projects)
  - [1. Todo List](#1-todo-list)
  - [2. Tic Tac Toe](#2-Jogo-da-Velha)
- [Getting Started](#getting-started)
- [Contact](#contact)

## Projects

### 1. Todo List

A full-stack task management application built with React and NestJS.

#### Features
- User authentication (register/login)
- Create, read, update, and delete tasks
- Task prioritization (low, medium, high)
- Task status management (open, in progress, done, archived)
- Dark/Light theme support
- Responsive design

#### Tech Stack

**Frontend:**
- React 19
- TypeScript
- Material-UI (MUI) v6
- React Router v7
- Axios
- Vite

**Backend:**
- NestJS 11
- TypeScript
- MySQL with TypeORM
- JWT Authentication
- Swagger/OpenAPI
- Docker

#### Project Structure

```
todo-list/
├── frontend/           # React application
│   ├── src/
│   │   ├── components/
│   │   ├── screens/
│   │   ├── services/
│   │   └── types/
│   └── package.json
│
└── backend/           # NestJS application
    ├── src/
    │   ├── dto/
    │   ├── infrastructure/
    │   ├── tasks/
    │   └── users/
    └── package.json
```

#### Setup and Installation

1. **Backend Setup**
```bash
cd backend
npm install

# Start MySQL container
cd src/infrastructure
docker-compose up -d

# Start the application
npm run start:dev
```

2. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

#### API Documentation

After starting the backend server, access the Swagger documentation at:
```
http://localhost:3000/api
```

#### Environment Variables

**Backend (.env)**
```
PORT=3000
JWT_SECRET=your_jwt_secret
```

**Frontend (.env)**
```
VITE_API_URL=http://localhost:3000
```

## Getting Started

1. Clone the repository
```bash
git clone <repository-url>
cd Projects_Programar
```

2. Navigate to the specific project directory and follow its setup instructions.
