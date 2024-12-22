import { OmitType } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { Role } from '@ams/core';
import { SignupDto } from '@/auth/dtos/signup.dto';
import { User } from '../entities/user.entity';

export class CreateUserRequestDto extends SignupDto {
  @IsEnum(Role)
  role: Role;
}

export class CreateUserResponseDto extends OmitType(User, ['password']) {}
