import { Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FindAllUserResponseDto } from './dtos/find-all-user-response.dto';
import { FindAllUserQueryDto } from './dtos/find-all-user.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(
    @Query() query: FindAllUserQueryDto,
  ): Promise<FindAllUserResponseDto> {
    const users = await this.userService.findAll(query);

    const prev = query.skip - query.take;
    const remaining = users.total - (query.skip + query.take);

    return {
      data: users.data.map((user) => ({ ...user, password: undefined })), // TODO: Find a fix to not expose password through class-transformer
      total: users.total,
      count: users.count,
      prev: prev >= 0 ? `/users?skip=${prev}&take=${query.take}` : undefined,
      next:
        remaining > 0
          ? `/users?skip=${query.skip + query.take}&take=${query.take}`
          : undefined,
    };
  }

  @Post()
  async createUser() {}

  @Put()
  async updateUser() {}

  @Delete()
  async deleteUser() {}
}
