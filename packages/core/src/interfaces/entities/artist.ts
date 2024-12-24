import { Gender } from "src/enums";

export interface IArtist {
  id: number;
  name: string;
  gender: Gender;
  user_id: number;
  dob: Date | null;
  address: string | null;
  first_release_year: number | null;
  no_of_albums_released: number | null;
  created_at: Date;
  updated_at: Date;
}
