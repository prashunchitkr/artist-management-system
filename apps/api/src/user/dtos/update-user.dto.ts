import { OmitType, PartialType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { IsOptional, IsStrongPassword } from 'class-validator';

export class UpdateUserRequestDto extends PartialType(
  OmitType(User, ['id', 'created_at', 'updated_at']),
) {
  @IsOptional()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password?: string;
}
