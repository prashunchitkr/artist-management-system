import { SignupDto } from '@/auth/dtos/signup.dto';
import { Role, User } from '../entities/user.entity';
import { IsEnum } from 'class-validator';

export class CreateUserRequestDto extends SignupDto {
  @IsEnum(Role)
  role: Role;
}

export class CreateUserResponseDto extends User {}
