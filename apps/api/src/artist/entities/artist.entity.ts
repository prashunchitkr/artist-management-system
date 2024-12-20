import { Gender } from '@/core/enums/db.enums';

export class Artist {
  id: number;
  name: string;
  gender: Gender;
  user_id: number;
  dob: Date | null;
  address: string | null;
  first_release_year: number | null;
  no_of_albums_released: number | null;
}
