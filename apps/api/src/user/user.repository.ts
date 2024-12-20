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
import { CannotUpdateUserException } from './exceptions/cannot-update-user.excepton';

@Injectable()
export class UserRepository implements IRepository<User> {
  private readonly logger = new Logger(UserRepository.name);
  constructor(private readonly db: DatabaseService) {}

  async count(): Promise<number> {
    const result = await this.db.query<{ count: string }>(
      'SELECT COUNT(*) FROM users',
    );

    return parseInt(result[0].count, 10);
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.db.query('SELECT * FROM users WHERE id = $1', [id]);
    return user.length > 0 ? plainToClass(User, user[0]) : null;
  }

  // TODO: Implement cursor based pagination for better performance
  async findAll(pagination: IPagination): Promise<IFindAllPaginated<User>> {
    const users = await this.db.query(
      'SELECT * FROM users LIMIT $1 OFFSET $2',
      [pagination.take, pagination.skip],
    );

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
      const user = await this.db.query(
        'INSERT INTO users (first_name, last_name, email, password, phone, dob, gender, address, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [
          entity.first_name,
          entity.last_name,
          entity.email,
          entity.password,
          entity.phone,
          entity.dob,
          entity.gender,
          entity.address,
          entity.role,
        ],
      );

      return plainToClass(User, user[0]);
    } catch (error) {
      this.logger.error('Error inserting into user', error);
      throw new CannotInsertUserException();
    }
  }

  async update(id: number, entity: User): Promise<User> {
    try {
      const user = await this.db.query(
        'UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4, phone = $5, dob = $6, gender = $7, address = $8, role=$9, updated_at = NOW() WHERE id = $10 RETURNING *',
        [
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
        ],
      );

      return plainToClass(User, user[0]);
    } catch (error) {
      this.logger.error('Error updating user', error);
      throw new CannotUpdateUserException(id, entity);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.db.query('DELETE FROM users WHERE id = $1', [id]);
    } catch (error) {
      this.logger.error('Error deleting user', error);
      throw new CannotUpdateUserException(id, error);
    }
  }

  async findUserFromEmailOrPhone(
    email: string,
    phone: string,
  ): Promise<User | null> {
    const user = await this.db.query(
      'SELECT * FROM users WHERE email = $1 OR phone = $2',
      [email, phone],
    );

    return user.length > 0 ? plainToClass(User, user[0]) : null;
  }
}
