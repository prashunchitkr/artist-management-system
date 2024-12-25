import { Genre } from "src/enums";

export interface IMusic {
  id: number;
  artist_id: number;
  title: string;
  genre: Genre;
  album_name: string | null;
  created_at: Date;
  updated_at: Date;
}
