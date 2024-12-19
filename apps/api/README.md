# Artist Management System API

## Setting up the environment

1. Copy the `.env.example` file into `.env` by running `cp .env.example .env` and fill the values are required
    - Configure the hostname and port where the application will be running
    - Fill the required database credentials
2. Run the database migrations with the command `pnpm run migrate`
    - This will create all the necessary tables in the database

## Running the application

1. The application can be run independently within the app directory or from the monorepo project root
    - If you are running from the application root use the command `pnpm start`
    - If you are running from the monorepo root for development purposes run the command `pnpm dev`
    - The app should be running on your configured port from `.env` and a swagger instance should also be running on the `/swagger` endpoint
