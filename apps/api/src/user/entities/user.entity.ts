import { Exclude } from 'class-transformer';

export enum Gender {
  Male = 'm',
  Female = 'f',
  Other = 'o',
}

export enum Role {
  SuperAdmin = 'super_admin',
  ArtistManager = 'artist_manager',
  Artist = 'artist',
}

export class User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: Gender;
  phone: string;
  dob: Date;
  address: string;

  role: Role;

  @Exclude({
    toPlainOnly: true,
  })
  password: string;

  created_at: Date;
  updated_at: Date;
}
