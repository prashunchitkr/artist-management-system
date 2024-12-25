import { Gender, Role } from "src/enums";
import { IUser } from "../entities";

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  expires_in: number;
}

export interface ISignupRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string | null;
  dob: Date | null;
  gender: Gender;
  address: string | null;
}

export interface IAuthResponse {
  token: string;
  expires_in: number;
}

export type IPayload = {
  artist_id: number | null;
} & Omit<IUser, "password" | "created_at" | "updated_at">;
