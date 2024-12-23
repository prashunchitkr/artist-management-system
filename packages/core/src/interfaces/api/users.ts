import { IUser } from "../entities";
import { IPaginatedResponse } from "./paginated-response";

export interface IUserResponse extends Omit<IUser, "password"> {}

export interface IGetAllUsersResponse
  extends IPaginatedResponse<IUserResponse> {}
