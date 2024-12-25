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
    const userExists = await this.findUserFromEmail(user.email);

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

  findUnassignedArtistUsers(): Promise<User[]> {
    return this.userRepository.findUnassignedArtistUsers();
  }

  async update(
    id: number,
    data: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>,
  ): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (data.email !== user.email) {
      const isValid = await this.validateNewEmail(data.phone, data.email);
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

  private async validateNewEmail(
    phone: string,
    email: string,
  ): Promise<boolean> {
    const user = await this.findUserFromEmail(email);

    if (user) {
      return false;
    }
    return true;
  }

  async findUserFromEmail(
    email: string,
  ): Promise<(User & { artist_id: number }) | null> {
    return this.userRepository.findUserFromEmail(email);
  }

  async delete(id: number): Promise<void> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.userRepository.delete(id);
  }
}
