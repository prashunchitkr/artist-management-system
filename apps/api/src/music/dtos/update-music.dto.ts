import { OmitType, PartialType } from '@nestjs/swagger';

import { CreateMusicRequestDto } from './create-music.dto';
import { MusicDto } from './music.dto';

export class UpdateMusicRequestDto extends PartialType(
  OmitType(CreateMusicRequestDto, ['artist_id']),
) {}

export class UpdateMusicResponseDto extends MusicDto {}
