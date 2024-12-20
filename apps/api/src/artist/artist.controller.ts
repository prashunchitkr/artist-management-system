import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArtistService } from './artist.service';

@ApiTags('Artist')
@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  async createArtist() {}

  @Get()
  async getArtists() {}

  @Get(':id')
  async getArtist() {}

  @Patch(':id')
  async updateArtist() {}

  @Delete(':id')
  async deleteArtist() {}
}
