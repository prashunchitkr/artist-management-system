import { Role } from "src/enums";
import { IUser } from "../entities";
import { ISignupRequest } from "./auth";
import { IPaginatedResponse } from "./paginated-response";

export interface IUserResponse extends Omit<IUser, "password"> {}

export interface ICreateUserRequest extends ISignupRequest {
  role: Role;
}

export interface IGetAllUsersResponse
  extends IPaginatedResponse<IUserResponse> {}

export interface IUpdateUserRequest
  extends Partial<Omit<IUser, "id" | "created_at" | "updated_at">> {
  password?: string;
}
