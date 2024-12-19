import { Type } from 'class-transformer';

import { PaginatedDto } from '@/infra/dtos/paginated.dto';
import { User } from '../entities/user.entity';

export class FindAllUserResponseDto implements PaginatedDto<User> {
  @Type(() => User)
  data: User[];

  total: number;
  count: number;
  prev?: string;
  next?: string;
}
