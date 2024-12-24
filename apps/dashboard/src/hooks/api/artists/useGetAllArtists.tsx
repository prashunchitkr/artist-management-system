import { IArtistResponse, IGetAllArtistsResponse } from "@ams/core";
import { API_URL } from "../../../core/utils/consts";
import { useQuery } from "@tanstack/react-query";

const getArtists = async (
  take: number,
  skip: number,
): Promise<IGetAllArtistsResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.set("take", take.toString());
  queryParams.set("skip", skip.toString());

  const endpoint = `${API_URL}/artists?${queryParams.toString()}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") || "")}`,
    },
  });

  if (!response.ok) {
    throw new Error("An error occurred while trying to get artists");
  }

  const data = await response.json();

  return {
    ...data,
    data: data.data.map((artist: IArtistResponse) => ({
      ...artist,
      dob: artist.dob ? new Date(artist.dob) : null,
      created_at: new Date(artist.created_at),
    })),
  };
};

export const useGetAllArtists = (skip: number, take: number) => {
  return useQuery({
    queryKey: ["artists", skip, take],
    queryFn: () => getArtists(take, skip),
  });
};
