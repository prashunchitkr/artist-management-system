import { IGetAllMusicResponse, IMusicResponse } from "@ams/core";
import { API_URL } from "../../../core/utils/consts";
import { useQuery } from "@tanstack/react-query";

const getArtistMusic = async (
  artistId: number,
  skip: number,
  take: number,
): Promise<IGetAllMusicResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.set("skip", skip.toString());
  queryParams.set("take", take.toString());

  const endpoint = `${API_URL}/artists/${artistId}/music?${queryParams.toString()}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") || "")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch artist music");
  }

  const data = await response.json();

  return {
    ...data,
    data: data.data.map((music: IMusicResponse) => ({
      ...music,
      created_at: new Date(music.created_at),
    })),
  };
};

export const useGetArtistMusic = (
  artistId: number,
  skip: number,
  take: number,
) => {
  return useQuery({
    queryKey: ["artistMusic", artistId, skip, take],
    queryFn: () => getArtistMusic(artistId, skip, take),
  });
};
