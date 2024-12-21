import { PartialType } from '@nestjs/swagger';
import { CreateArtistRequestDto } from './create-artist.dto';
import { ArtistResponseDto } from './artist-response.dto';

export class UpdateArtistRequestDto extends PartialType(
  CreateArtistRequestDto,
) {}

export class UpdateArtistResponseDto extends ArtistResponseDto {}
