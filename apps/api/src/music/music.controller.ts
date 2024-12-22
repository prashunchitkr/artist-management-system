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

import { ArtistExistsGuard } from '@/artist/guards/artist-exists.guard';
import { Roles } from '@/auth/decorators/role.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/role.guard';
import {
  CreateMusicRequestDto,
  CreateMusicResponseDto,
} from './dtos/create-music.dto';
import {
  GetAllMusicQueryDto,
  GetAllMusicResponseDto,
} from './dtos/get-music.dto';
import {
  UpdateMusicRequestDto,
  UpdateMusicResponseDto,
} from './dtos/update-music.dto';
import { MusicService } from './song.service';
import { Role } from '@ams/core';

@ApiTags('Music')
@Controller('artists/:artistId/music')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard, ArtistExistsGuard)
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Post()
  @Roles(Role.SuperAdmin, Role.Artist)
  create(
    @Body() createMusicRequestDto: CreateMusicRequestDto,
  ): Promise<CreateMusicResponseDto> {
    return this.musicService.create(createMusicRequestDto);
  }

  @Get()
  @Roles(Role.SuperAdmin, Role.ArtistManager, Role.Artist)
  async getAll(
    @Param('artistId') artistId: number,
    @Query() query: GetAllMusicQueryDto,
  ): Promise<GetAllMusicResponseDto> {
    return this.musicService.findManyByArtistId(artistId, query);
  }

  @Patch(':id')
  @Roles(Role.SuperAdmin, Role.Artist)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateMusicRequestDto,
  ): Promise<UpdateMusicResponseDto> {
    return this.musicService.update(id, data);
  }

  @Delete(':id')
  @Roles(Role.SuperAdmin, Role.Artist)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.musicService.delete(id);
  }
}
