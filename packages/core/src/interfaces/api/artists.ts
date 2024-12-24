import { IArtist } from "../entities";
import { IPaginatedResponse } from "./paginated-response";

export interface IArtistResponse extends Omit<IArtist, "updated_at"> {}

export interface ICreateArtistRequest
  extends Omit<IArtist, "id" | "created_at" | "updated_at"> {}

export interface IGetAllArtistsResponse
  extends IPaginatedResponse<IArtistResponse> {}

export interface IUpdateArtistRequest extends Partial<ICreateArtistRequest> {}
