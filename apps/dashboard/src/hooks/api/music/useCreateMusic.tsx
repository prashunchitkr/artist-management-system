import { ICreateMusicRequest, IMusicResponse } from "@ams/core";
import { API_URL } from "../../../core/utils/consts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createMusic = async (
  artistId: number,
  data: ICreateMusicRequest,
): Promise<IMusicResponse> => {
  const endpoint = `${API_URL}/artists/${artistId}/music`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") || "")}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create music");
  }

  return response.json();
};

export const useCreateMusic = (artistId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["artistMusic", artistId],
    mutationFn: (data: ICreateMusicRequest) => createMusic(artistId, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["artistMusic", artistId] }),
  });
};
