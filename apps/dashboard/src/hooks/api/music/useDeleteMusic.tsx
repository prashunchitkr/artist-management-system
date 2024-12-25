import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../../core/utils/consts";

const deleteMusic = async (
  artistId: number,
  musicId: number,
): Promise<void> => {
  const endpoint = `${API_URL}/artists/${artistId}/music/${musicId}`;

  const response = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") || "")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete music");
  }
};

export const useDeleteMusic = (artistId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["artistMusic", artistId],
    mutationFn: (musicId: number) => deleteMusic(artistId, musicId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["artistMusic", artistId],
      }),
  });
};
