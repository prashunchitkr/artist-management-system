import { SignupDto } from '@/auth/dtos/signup.dto';
import { User } from '../entities/user.entity';
import { IsEnum } from 'class-validator';
import { OmitType } from '@nestjs/swagger';
import { Role } from '@/core/enums/db.enums';

export class CreateUserRequestDto extends SignupDto {
  @IsEnum(Role)
  role: Role;
}

export class CreateUserResponseDto extends OmitType(User, ['password']) {}
