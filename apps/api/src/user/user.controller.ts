import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  CreateUserRequestDto,
  CreateUserResponseDto,
} from './dtos/create-user.dto';
import { FindAllUserResponseDto } from './dtos/find-all-user-response.dto';
import { FindAllUserQueryDto } from './dtos/find-all-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private readonly maskPassword = (user: User) => {
    user.password = undefined; // TODO: Find a fix to not expose password through class-transformer
    return user;
  };

  @Get()
  async findAll(
    @Query() query: FindAllUserQueryDto,
  ): Promise<FindAllUserResponseDto> {
    const users = await this.userService.findAll(query);

    return {
      data: users.data.map(this.maskPassword),
      total: users.total,
      count: users.count,
    };
  }

  @Post()
  async createUser(
    @Body() data: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    return this.userService.createUser(data).then(this.maskPassword);
  }

  @Put()
  async updateUser() {}

  @Delete()
  async deleteUser() {}
}
