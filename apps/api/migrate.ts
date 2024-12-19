import runMigrations from 'node-pg-migrate';
import * as dotenv from 'dotenv';

dotenv.config();

async function run() {
  try {
    await runMigrations({
      databaseUrl:
        `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}` ||
        'postgres://postgres:postgres@localhost:5432/artist_management_system',
      migrationsTable: 'migrations',
      direction: 'up',
      dir: './migrations',
      log: console.log,
    });
  } catch (error) {
    console.error('Migration failed with error:', error);
  }
}

run();
