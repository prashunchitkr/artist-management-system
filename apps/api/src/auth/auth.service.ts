import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Role, User } from '@/user/entities/user.entity';
import { UserService } from '@/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './dtos/auth-response.dto';
import { SignupDto } from './dtos/signup.dto';
import { PasswordService } from './password.service';

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
    const userExists = await this.userService.findUserFromEmailOrPhone(
      user.email,
      user.phone,
    );

    if (userExists) {
      throw new ConflictException(
        'User with given email or phone already exists',
      );
    }

    const password = await this.passwordService.hashPassword(user.password);

    const newUser = await this.userService.createUser({
      ...user,
      role: Role.SuperAdmin, // FIXME: Change the role to something inferior
      password,
    });

    return this.getJwtToken(newUser);
  }

  async login(email: string, password: string): Promise<AuthResponseDto> {
    const user = await this.userService.findUserFromEmailOrPhone(email, '');

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValidPassword = await this.passwordService.comparePassword(
      password,
      user.password,
    );

    if (!isValidPassword) {
      throw new BadRequestException('Invalid email and password combination');
    }

    return this.getJwtToken(user);
  }
}
