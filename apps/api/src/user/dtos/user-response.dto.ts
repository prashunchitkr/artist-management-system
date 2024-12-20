import { OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserResponseDto extends OmitType(User, ['password']) {
  constructor(partial: Partial<UserResponseDto>) {
    super();
    Object.assign(this, partial);
  }
}
