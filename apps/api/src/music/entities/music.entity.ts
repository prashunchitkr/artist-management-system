import { Genre } from '@/core/enums/db.enums';
import { IEntity } from '@/infra/interfaces/entity.interface';

export class Music implements IEntity {
  id: number;
  artist_id: number;
  title: string;
  genre: Genre;
  album_name: string | null;
  created_at: Date;
  updated_at: Date;
}
