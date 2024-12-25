import { IMusic } from "../entities";
import { IPaginatedResponse } from "./paginated-response";

export interface IMusicResponse extends Omit<IMusic, "updated_at"> {}

export interface IGetAllMusicResponse
  extends IPaginatedResponse<IMusicResponse> {}

export interface ICreateMusicRequest
  extends Omit<IMusic, "id" | "updated_at" | "created_at"> {}

export interface IUpdateMusicRequest
  extends Omit<ICreateMusicRequest, "artist_id"> {}
