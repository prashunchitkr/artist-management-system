import { IUser } from "../entities";
import { IPaginatedResponse } from "./paginated-response";

export interface IUserResponse extends Omit<IUser, "password"> {}

export interface IGetAllUsersResponse
  extends IPaginatedResponse<IUserResponse> {}

export interface IUpdateUserRequest
  extends Partial<Omit<IUser, "id" | "created_at" | "updated_at">> {
  password?: string;
}
