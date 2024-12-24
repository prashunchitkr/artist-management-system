import { IArtistResponse, IUpdateArtistRequest } from "@ams/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../../core/utils/consts";

const updateArtist = async (
  id: string,
  data: IUpdateArtistRequest,
): Promise<IArtistResponse> => {
  const endpoint = `${API_URL}/artists/${id}`;

  const response = await fetch(endpoint, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") || "")}`,
    },
  });

  if (!response.ok) {
    throw new Error("An error occurred while trying to update artist");
  }

  return response.json();
};

export const useUpdateArtist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["artists"],
    mutationFn: (data: { id: string; data: IUpdateArtistRequest }) =>
      updateArtist(data.id, data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["artists"],
      });
    },
  });
};
