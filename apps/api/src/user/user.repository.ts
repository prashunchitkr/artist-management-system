import { Injectable, Logger } from '@nestjs/common';

import { DatabaseService } from '@/infra/database.service';
import {
  IFindAllPaginated,
  IPagination,
  IRepository,
} from '@/infra/interfaces/repository.interface';
import { plainToClass } from 'class-transformer';
import { User } from './entities/user.entity';
import { CannotInsertUserException } from './exceptions/cannot-insert-user.exception';
import { CannotUpdateUserException } from './exceptions/cannot-update-user.exception';

@Injectable()
export class UserRepository implements IRepository<User> {
  private readonly logger = new Logger(UserRepository.name);
  constructor(private readonly db: DatabaseService) {}

  async count(): Promise<number> {
    const query = 'SELECT COUNT(*) FROM users';

    const result = await this.db.query<{ count: string }>(query);

    return parseInt(result[0].count, 10);
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.db.query('SELECT * FROM users WHERE id = $1', [id]);
    return user.length > 0 ? plainToClass(User, user[0]) : null;
  }

  // TODO: Implement cursor based pagination for better performance
  async findAll(pagination: IPagination): Promise<IFindAllPaginated<User>> {
    const query = 'SELECT * FROM users ORDER BY created_at LIMIT $1 OFFSET $2';
    const params = [pagination.take, pagination.skip];

    const users = await this.db.query(query, params);

    return {
      data: users.map((user) => plainToClass(User, user)),
      total: await this.count(),
      count: users.length,
    };
  }

  async create(
    entity: Omit<User, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<User> {
    try {
      const query = `
        INSERT INTO
          users (first_name, last_name, email, password, phone, dob, gender, address, role)
        VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
      `;

      const params = [
        entity.first_name,
        entity.last_name,
        entity.email,
        entity.password,
        entity.phone,
        entity.dob,
        entity.gender,
        entity.address,
        entity.role,
      ];

      const user = await this.db.query(query, params);

      return plainToClass(User, user[0]);
    } catch (error) {
      this.logger.error('Error inserting into user', error);
      throw new CannotInsertUserException();
    }
  }

  async update(id: number, entity: User): Promise<User> {
    try {
      const query = `
        UPDATE users
        SET first_name = $1, last_name = $2, email = $3, password = $4, phone = $5, dob = $6, gender = $7, address = $8, role = $9, updated_at = NOW()
        WHERE id = $10
        RETURNING *
      `;

      const params = [
        entity.first_name,
        entity.last_name,
        entity.email,
        entity.password,
        entity.phone,
        entity.dob,
        entity.gender,
        entity.address,
        entity.role,
        entity.id,
      ];

      const user = await this.db.query(query, params);

      return plainToClass(User, user[0]);
    } catch (error) {
      this.logger.error('Error updating user', error);
      throw new CannotUpdateUserException(id, entity);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const query = 'DELETE FROM users WHERE id = $1';
      const params = [id];

      await this.db.query(query, params);
    } catch (error) {
      this.logger.error('Error deleting user', error);
      throw new CannotUpdateUserException(id, error);
    }
  }

  async findUserFromEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = $1';
    const params = [email];

    const user = await this.db.query(query, params);

    return user.length > 0 ? plainToClass(User, user[0]) : null;
  }
}
