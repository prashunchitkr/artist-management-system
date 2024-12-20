import { ConflictException, Injectable } from '@nestjs/common';

import {
  IFindAllPaginated,
  IPagination,
} from '@/infra/interfaces/repository.interface';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { PasswordService } from '@/core/utils/password.service';

@Injectable()
export class UserService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(
    user: Omit<User, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<User> {
    const userExists = await this.findUserFromEmailOrPhone(
      user.email,
      user.phone,
    );

    if (userExists) {
      throw new ConflictException(
        'User with given email or phone already exists',
      );
    }

    const hashedPassword = await this.passwordService.hash(user.password);

    return this.userRepository.create({
      ...user,
      password: hashedPassword,
    });
  }

  async findOneUser(id: number): Promise<User | null> {
    return this.userRepository.findOne(id);
  }

  async findAll(pagination: IPagination): Promise<IFindAllPaginated<User>> {
    return this.userRepository.findAll(pagination);
  }

  async findUserFromEmailOrPhone(
    email: string,
    phone: string,
  ): Promise<User | null> {
    return this.userRepository.findUserFromEmailOrPhone(email, phone);
  }
}
