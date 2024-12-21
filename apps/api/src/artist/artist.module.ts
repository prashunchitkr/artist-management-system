import { Module } from '@nestjs/common';

import { UserModule } from '@/user/user.module';
import { ArtistController } from './artist.controller';
import { ArtistRepository } from './artist.repository';
import { ArtistService } from './artist.service';

@Module({
  imports: [UserModule],
  controllers: [ArtistController],
  providers: [ArtistRepository, ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
