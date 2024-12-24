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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Roles } from '@/auth/decorators/role.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/role.guard';
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
} from './dtos/create-user.dto';
import {
  FindAllUserResponseDto,
  FindUnassignedArtistUsersDto,
} from './dtos/find-all-user-response.dto';
import { FindAllUserQueryDto } from './dtos/find-all-user.dto';
import { UpdateUserRequestDto } from './dtos/update-user.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { Role } from '@ams/core';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  private readonly stripPrivateFields = (user: User): UserResponseDto => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  };

  @Get()
  @Roles(Role.SuperAdmin)
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

  @Get('unassigned-artists')
  @Roles(Role.SuperAdmin, Role.ArtistManager)
  async findUnassignedArtistUsers(): Promise<FindUnassignedArtistUsersDto[]> {
    const users = await this.userService.findUnassignedArtistUsers();

    return users.map((user) => ({
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
    }));
  }

  @Post()
  @Roles(Role.SuperAdmin)
  async createUser(
    @Body() data: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    return this.userService.createUser(data).then(this.stripPrivateFields);
  }

  @Patch(':id')
  @Roles(Role.SuperAdmin)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    return this.userService.update(id, data).then(this.stripPrivateFields);
  }

  @Delete(':id')
  @Roles(Role.SuperAdmin)
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
