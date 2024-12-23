import { Type } from 'class-transformer';

import { PaginatedDto } from '@/infra/dtos/paginated.dto';
import { IGetAllUsersResponse } from '@ams/core';
import { UserResponseDto } from './user-response.dto';

export class FindAllUserResponseDto
  implements PaginatedDto<UserResponseDto>, IGetAllUsersResponse
{
  @Type(() => UserResponseDto)
  data: UserResponseDto[];

  total: number;
  count: number;
}
