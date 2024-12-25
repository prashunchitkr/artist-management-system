# Artist Management System

## Overview

The Artist Management System is a monorepo project designed to manage artists, their music, and users with different roles. It includes a backend API and a frontend application.

## Project Structure

- **API**: Located in [apps/api](apps/api), this is the backend service that handles all the business logic and data management.
- **Frontend**: Located in [apps/dashboard](apps/dashboard), this is the frontend application that interacts with the API.
- **Core**: Located in [packages/core](packages/core), contains shared interfaces between apps. This needs to be build first in order to run/build other applications.

## Setup Environment

### Using Docker Compose

1. Ensure you have Docker and Docker Compose installed on your machine.
2. Copy the `.env.example` files in both `apps/api` and `apps/frontend` to `.env` and fill in the required values.
   - For the API, configure the database credentials and JWT settings.
   - For the frontend, configure the API endpoint and other necessary settings.
3. Run the following command to start the services:

   ```sh
   docker compose up -d
   ```

## Features

### CRUD Operations

1. Users
2. Artists
3. Songs (Work In Progress)

### Role-Based Access Control (RBAC)

Roles: super_admin, artist_manager, artist

## Running the Application

The application can be run independently within the app directory or from the monorepo project root.

- Build the core package using the command `pnpm build --filter=@ams/core`
- If you are running from the application root, use the command `pnpm dev`.
- If you are running from the monorepo root for development purposes, run the command `pnpm dev`.
- The app should be running on your configured port from .env, and a Swagger instance should also be running on the /swagger endpoint for the API.
- As per the dashboard, it should be operating in the port 5173
