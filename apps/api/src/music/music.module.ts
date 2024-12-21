import { Module } from '@nestjs/common';

import { ArtistModule } from '@/artist/artist.module';
import { MusicRepository } from './music.repository';
import { MusicService } from './song.service';
import { MusicController } from './music.controller';

@Module({
  imports: [ArtistModule],
  providers: [MusicRepository, MusicService],
  controllers: [MusicController],
})
export class MusicModule {}
