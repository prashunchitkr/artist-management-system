import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(
    user: Omit<User, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<User> {
    return this.userRepository.create(user);
  }

  async findOneUser(id: number): Promise<User | null> {
    return this.userRepository.findOne(id);
  }

  async findUserFromEmailOrPhone(
    email: string,
    phone: string,
  ): Promise<User | null> {
    return this.userRepository.findUserFromEmailOrPhone(email, phone);
  }
}
