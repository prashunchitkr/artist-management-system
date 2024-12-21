import { OmitType } from '@nestjs/swagger';
import { Artist } from '../entities/artist.entity';

export class ArtistResponseDto extends OmitType(Artist, ['updated_at']) {}
