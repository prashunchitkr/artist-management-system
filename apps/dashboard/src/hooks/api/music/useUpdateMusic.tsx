import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IMusicResponse, IUpdateMusicRequest } from "@ams/core";
import { API_URL } from "../../../core/utils/consts";

const updateMusic = (
  artistId: number,
  musicId: number,
  payload: IUpdateMusicRequest,
): Promise<IMusicResponse> => {
  const endpoint = `${API_URL}/artists/${artistId}/music/${musicId}`;

  return fetch(endpoint, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") || "")}`,
    },
    body: JSON.stringify(payload),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to update music");
    }

    return response.json();
  });
};

export const useUpdateMusic = (artistId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["artistMusic", artistId],
    mutationFn: (payload: { id: number; data: IUpdateMusicRequest }) =>
      updateMusic(artistId, payload.id, payload.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["artistMusic", artistId],
      });
    },
  });
};
