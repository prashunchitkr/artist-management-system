import { OmitType, PartialType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UpdateUserRequestDto extends PartialType(
  OmitType(User, ['id', 'created_at', 'updated_at']),
) {}

export class UpdateUserResponseDto extends OmitType(User, ['password']) {}
