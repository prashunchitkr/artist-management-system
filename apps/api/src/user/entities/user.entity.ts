export enum Gender {
  Male = 'm',
  Female = 'f',
  Other = 'o',
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  dob: Date;
  gender: Gender;
  address: string;
  created_at: Date;
  updated_at: Date;
}
