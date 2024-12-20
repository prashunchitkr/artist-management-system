import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistRepository } from './artist.repository';
import { ArtistService } from './artist.service';

@Module({
  imports: [],
  controllers: [ArtistController],
  providers: [ArtistRepository, ArtistService],
})
export class ArtistModule {}
