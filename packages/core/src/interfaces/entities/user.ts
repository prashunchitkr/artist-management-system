import { Gender, Role } from "../../enums";

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: Gender;
  phone: string | null;
  dob: Date | null;
  address: string | null;
  role: Role;
  password: string;
  created_at: Date;
  updated_at: Date;
}
