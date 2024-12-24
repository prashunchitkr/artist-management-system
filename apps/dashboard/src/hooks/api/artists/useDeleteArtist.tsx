import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../../core/utils/consts";

const deleteArtist = async (id: string) => {
  const endpoint = `${API_URL}/artists/${id}`;

  const response = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") || "")}`,
    },
  });

  if (!response.ok) {
    throw new Error("An error occurred while trying to delete the artist");
  }
};

export const useDeleteArtist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["artists"],
    mutationFn: deleteArtist,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["artists"],
      });
    },
  });
};
