# Todo-App-v2

Dockerized full stack Todo application using Node.js (backend), PostgreSQL (database), Prisma (ORM) and JWT Authentication.

## Table of Contents

- Project Overview
- Features
- Tech Stack
- Getting Started
  - Prerequisites
  - Environment Variables
  - Local (Docker) Setup
  - Running without Docker
- Database (Prisma)
- API Endpoints
- Authentication
- Testing
- Contributing
- License

## Project Overview

Todo-App-v2 is a simple, production-ready Todo application demonstrating a containerized full-stack architecture: a Node.js REST API, PostgreSQL database, Prisma ORM, and JWT-based authentication. It is intended as a learning/reference project and a starting template for CRUD apps.

## Features

- User registration and login (JWT)
- Create, read, update, delete (CRUD) todos
- Per-user todo isolation
- Dockerized services for easy local development
- Database schema managed with Prisma

## Tech Stack

- Node.js (Express or similar) for the backend
- PostgreSQL for relational storage
- Prisma as the ORM and migration tool
- JWT for authentication
- Docker & Docker Compose for environment orchestration

## Getting Started

### Prerequisites

- Docker & Docker Compose (recommended)
- Node.js and npm/yarn (only if running without Docker)

### Environment Variables

Create a .env file from the provided example (.env.example) or ensure environment variables are set in your environment or docker-compose. Typical variables:

- DATABASE_URL=postgresql://USER:PASSWORD@db:5432/todo_db?schema=public
- JWT_SECRET=your_jwt_secret
- PORT=3000

Adjust names/values to match your local setup.

### Local (Docker) Setup

1. Build and start containers:

	docker-compose up --build

2. Apply database migrations (if not automated):

	docker-compose exec api npx prisma migrate deploy

3. Seed the database (if seeds are provided):

	docker-compose exec api npx prisma db seed

4. The API will be available at http://localhost:3000 (or the PORT you configured).

### Running without Docker

1. Install dependencies:

	npm install

2. Ensure PostgreSQL is running and DATABASE_URL is set.

3. Run migrations:

	npx prisma migrate deploy

4. Start the server:

	npm run dev

## Database (Prisma)

- Schema: prisma/schema.prisma
- Common commands:
  - npx prisma migrate dev --name init
  - npx prisma migrate deploy
  - npx prisma db seed
  - npx prisma studio

## API Endpoints (typical)

Note: adjust paths to match implementation in the repository.

- POST /api/auth/register — Register a new user (body: { email, password })
- POST /api/auth/login — Login and receive JWT (body: { email, password })
- GET /api/todos — Get current user's todos (Auth required)
- POST /api/todos — Create a todo (Auth required, body: { title, description?, completed? })
- GET /api/todos/:id — Get a single todo (Auth required)
- PUT /api/todos/:id — Update a todo (Auth required)
- DELETE /api/todos/:id — Delete a todo (Auth required)

## Authentication

- Uses JWT tokens returned from the /auth/login endpoint.
- Protect routes by sending Authorization: Bearer <token> header.

## Testing

- If tests are provided, run with:

  npm test

Or run any provided integration tests against the dockerized stack.

## Contributing

- Fork the repository, create a feature branch, make changes, run tests and open a pull request.
- Keep changes focused and include migration files for schema changes.

## License

This project is provided under the MIT License unless another license file is present in the repository.

---

For repository-specific details (scripts, exact endpoint paths, or seed data), see the code and any example env files in the repository.
