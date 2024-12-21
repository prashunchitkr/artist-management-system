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
import { Role } from '@/core/enums/db.enums';
import { FindAllUserQueryDto } from '@/user/dtos/find-all-user.dto';
import { ArtistService } from './artist.service';
import { ArtistResponseDto } from './dtos/artist-response.dto';
import { CreateArtistRequestDto } from './dtos/create-artist.dto';
import { FindArtistResponseDto } from './dtos/find-artist.dto';
import {
  UpdateArtistRequestDto,
  UpdateArtistResponseDto,
} from './dtos/update-artist.dto';

@ApiTags('Artist')
@Controller('artists')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @Roles(Role.SuperAdmin, Role.ArtistManager)
  async createArtist(
    @Body() data: CreateArtistRequestDto,
  ): Promise<ArtistResponseDto> {
    return this.artistService.createArtist(data);
  }

  @Get()
  @Roles(Role.SuperAdmin, Role.ArtistManager)
  async findAllArtists(
    @Query() query: FindAllUserQueryDto,
  ): Promise<FindArtistResponseDto> {
    return this.artistService.getArtists(query);
  }

  @Get(':id')
  @Roles(Role.SuperAdmin, Role.ArtistManager)
  async findArtistById(
    @Param('id', ParseIntPipe) artistId: number,
  ): Promise<ArtistResponseDto> {
    return this.artistService.getArtist(artistId);
  }

  @Patch(':id')
  @Roles(Role.SuperAdmin, Role.ArtistManager)
  async updateArtist(
    @Param('id', ParseIntPipe) artistId: number,
    @Body() data: UpdateArtistRequestDto,
  ): Promise<UpdateArtistResponseDto> {
    return this.artistService.updateArtist(artistId, data);
  }

  @Delete(':id')
  @Roles(Role.SuperAdmin, Role.ArtistManager)
  async deleteArtist(@Param('id', ParseIntPipe) artistId: number) {}

  @Get(':id/songs')
  @Roles(Role.SuperAdmin, Role.ArtistManager)
  async getSongs(@Param('id', ParseIntPipe) artistId: number) {}
}
