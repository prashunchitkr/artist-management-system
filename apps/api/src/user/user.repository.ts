import { Injectable, Logger } from '@nestjs/common';

import { DatabaseService } from '@/infra/database.service';
import {
  IPagination,
  IRepository,
} from '@/infra/interfaces/repository.interface';
import { User } from './entities/user.entity';
import { CannotInsertUserException } from './exceptions/cannot-insert-user.exception';
import { UserNotFoundException } from './exceptions/user-not-found.exception';

@Injectable()
export class UserRepository implements IRepository<User> {
  private readonly logger = new Logger(UserRepository.name);
  constructor(private readonly db: DatabaseService) {}

  async findOne(id: number): Promise<User | null> {
    const user = await this.db.query<User>(
      'SELECT * FROM users WHERE id = $1',
      [id],
    );
    return user.length > 0 ? user[0] : null;
  }

  async findAll(pagination: IPagination): Promise<User[]> {
    const users = await this.db.query<User>(
      'SELECT * FROM users LIMIT $1 OFFSET $2',
      [pagination.take, pagination.skip],
    );

    return users;
  }

  async create(entity: User): Promise<User> {
    try {
      const user = await this.db.query<User>(
        'INSERT INTO users (first_name, last_name, email, password, phone, dob, gender, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [
          entity.first_name,
          entity.last_name,
          entity.email,
          entity.password,
          entity.phone,
          entity.dob,
          entity.gender,
          entity.address,
        ],
      );

      return user[0];
    } catch (error) {
      this.logger.error('Error inserting into user', error);
      throw new CannotInsertUserException();
    }
  }

  async update(id: number, entity: User): Promise<User> {
    try {
      const user = await this.db.query<User>(
        'UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4, phone = $5, dob = $6, gender = $7, address = $8, updated_at = NOW() WHERE id = $9 RETURNING *',
        [
          entity.first_name,
          entity.last_name,
          entity.email,
          entity.password,
          entity.phone,
          entity.dob,
          entity.gender,
          entity.address,
          entity.id,
        ],
      );

      return user[0];
    } catch (error) {
      this.logger.error('Error updating user', error);
      throw new UserNotFoundException(id);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.db.query('DELETE FROM users WHERE id = $1', [id]);
    } catch (error) {
      this.logger.error('Error deleting user', error);
      throw new UserNotFoundException(id);
    }
  }
}
