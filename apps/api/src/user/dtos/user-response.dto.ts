import { OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { IUserResponse } from '@ams/core';

export class UserResponseDto
  extends OmitType(User, ['password'])
  implements IUserResponse
{
  constructor(partial: Partial<UserResponseDto>) {
    super();
    Object.assign(this, partial);
  }
}
