import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { CONFIG_KEYS } from 'src/core/config/app.config';
import { IDatabaseConfig } from 'src/core/config/database.config';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);
  private readonly pool: Pool;

  constructor(configService: ConfigService) {
    const dbConfig = configService.get<IDatabaseConfig>(CONFIG_KEYS.database);

    this.pool = new Pool({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      max: 10,
      idleTimeoutMillis: 30000,
    });
  }

  async onModuleInit() {
    this.logger.verbose('Database connection established');
    const { rows } = await this.pool.query<{ now: Date }>('SELECT NOW()');
    this.logger.verbose('Database time:', rows[0].now);
  }

  async query<T>(query: string, params?: any[]): Promise<T[]> {
    const client = await this.pool.connect();
    try {
      this.logger.debug('Executing Query:', query, params);
      const result = await this.pool.query<T>(query, params);
      return result.rows;
    } catch (error) {
      this.logger.error('Database Query Error:', error);
      throw new Error('Database Query Error');
    } finally {
      client.release();
    }
  }

  async onModuleDestroy() {
    this.logger.verbose('Database connection closed');
    await this.pool.end();
  }
}
