import { Gender, Role } from '@ams/core';
import { Exclude } from 'class-transformer';

export class User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: Gender;
  phone: string | null;
  dob: Date | null;
  address: string | null;
  role: Role;

  @Exclude({
    toPlainOnly: true,
  })
  password: string;

  created_at: Date;
  updated_at: Date;
}
