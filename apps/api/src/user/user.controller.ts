import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  CreateUserRequestDto,
  CreateUserResponseDto,
} from './dtos/create-user.dto';
import { FindAllUserResponseDto } from './dtos/find-all-user-response.dto';
import { FindAllUserQueryDto } from './dtos/find-all-user.dto';
import { UpdateUserRequestDto } from './dtos/update-user.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private readonly stripPrivateFields = (user: User): UserResponseDto => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  };

  @Get()
  async findAll(
    @Query() query: FindAllUserQueryDto,
  ): Promise<FindAllUserResponseDto> {
    const users = await this.userService.findAll(query);

    return {
      data: users.data.map(this.stripPrivateFields),
      total: users.total,
      count: users.count,
    };
  }

  @Post()
  async createUser(
    @Body() data: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    return this.userService.createUser(data).then(this.stripPrivateFields);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    return this.userService.update(id, data).then(this.stripPrivateFields);
  }

  @Delete(':id')
  async deleteUser() {}
}
