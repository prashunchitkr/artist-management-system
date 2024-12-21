import { IsEnum, IsInt, IsString } from 'class-validator';

import { IsNullable } from '@/core/decorators/is-nullable.decorator';
import { Genre } from '@/core/enums/db.enums';
import { MusicDto } from './music.dto';

export class CreateMusicRequestDto {
  @IsInt()
  artist_id: number;

  @IsString()
  title: string;

  @IsEnum(Genre)
  genre: Genre;

  @IsNullable()
  album_name: string | null;
}

export class CreateMusicResponseDto extends MusicDto {}
