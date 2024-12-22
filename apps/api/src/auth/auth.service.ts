import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { User } from '@/user/entities/user.entity';
import { UserService } from '@/user/user.service';
import { Role } from '@ams/core';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from '../core/utils/password.service';
import { AuthResponseDto } from './dtos/auth-response.dto';
import { SignupDto } from './dtos/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly userService: UserService,
  ) {}

  private async getJwtToken(user: User): Promise<AuthResponseDto> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, created_at, updated_at, ...profile } = user;
    const token = await this.jwtService.signAsync({
      profile,
      sub: profile.email,
    });

    return {
      token: token,
      expires_in: 3600,
    };
  }

  async signup(user: SignupDto): Promise<AuthResponseDto> {
    const userExists = await this.userService.findUserFromEmail(user.email);

    if (userExists) {
      throw new ConflictException(
        'User with given email or phone already exists',
      );
    }

    const newUser = await this.userService.createUser({
      ...user,
      role: Role.SuperAdmin, // FIXME: Change the role to something inferior?
    });

    return this.getJwtToken(newUser);
  }

  async login(email: string, password: string): Promise<AuthResponseDto> {
    const user = await this.userService.findUserFromEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValidPassword = await this.passwordService.compare(
      password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid email and password combination');
    }

    return this.getJwtToken(user);
  }
}
