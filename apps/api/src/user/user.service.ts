import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PasswordService } from '@/core/utils/password.service';
import {
  IFindAllPaginated,
  IPagination,
} from '@/infra/interfaces/repository.interface';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

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

  async update(
    id: number,
    data: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>,
  ): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (data.email !== user.email || data.phone !== user.phone) {
      const isValid = await this.validateNewPhoneOrEmail(
        data.phone,
        data.email,
      );
      if (!isValid) {
        throw new ConflictException(
          'User with given email or phone already exists',
        );
      }
    }

    if (data.password) {
      data.password = await this.passwordService.hash(data.password);
    }

    return this.userRepository.update(id, {
      ...user,
      ...data,
    });
  }

  private async validateNewPhoneOrEmail(
    phone: string,
    email: string,
  ): Promise<boolean> {
    const user = await this.findUserFromEmailOrPhone(email, phone);

    if (user) {
      return false;
    }
    return true;
  }

  async findUserFromEmailOrPhone(
    email: string,
    phone: string,
  ): Promise<User | null> {
    return this.userRepository.findUserFromEmailOrPhone(email, phone);
  }
}
