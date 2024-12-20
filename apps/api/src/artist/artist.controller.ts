import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/role.guard';
import { ArtistService } from './artist.service';
import {
  CreateArtistRequestDto,
  CreateArtistResponseDto,
} from './dtos/create-artist.dto';
import { Roles } from '@/auth/decorators/role.decorator';
import { Role } from '@/core/enums/db.enums';

@ApiTags('Artist')
@Controller('artists')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @Roles(Role.ArtistManager)
  async createArtist(
    @Body() data: CreateArtistRequestDto,
  ): Promise<CreateArtistResponseDto> {
    return this.artistService.createArtist(data);
  }

  @Get()
  @Roles(Role.SuperAdmin, Role.ArtistManager)
  async getArtists() {}

  @Get(':id')
  @Roles(Role.SuperAdmin, Role.ArtistManager)
  async getArtist(@Param('id', ParseIntPipe) artistId: number) {}

  @Patch(':id')
  @Roles(Role.ArtistManager)
  async updateArtist(@Param('id', ParseIntPipe) artistId: number) {}

  @Delete(':id')
  @Roles(Role.ArtistManager)
  async deleteArtist(@Param('id', ParseIntPipe) artistId: number) {}

  @Get(':id/songs')
  @Roles(Role.SuperAdmin, Role.ArtistManager)
  async getSongs(@Param('id', ParseIntPipe) artistId: number) {}
}
