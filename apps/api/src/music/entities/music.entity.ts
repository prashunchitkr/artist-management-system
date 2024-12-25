import { Genre, IMusic } from '@ams/core';
import { Exclude } from 'class-transformer';

export class Music implements IMusic {
  id: number;
  artist_id: number;
  title: string;
  genre: Genre;
  album_name: string | null;
  created_at: Date;

  @Exclude()
  updated_at: Date;
}
