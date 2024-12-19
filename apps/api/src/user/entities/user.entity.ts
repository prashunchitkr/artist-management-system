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

  @Exclude()
  password: string;

  phone: string;
  dob: Date;
  gender: Gender;
  address: string;
  role: Role;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;
}
