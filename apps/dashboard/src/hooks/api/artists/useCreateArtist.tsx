import { IArtistResponse, ICreateArtistRequest } from "@ams/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../../core/utils/consts";

const createArtist = async (
  data: ICreateArtistRequest,
): Promise<IArtistResponse> => {
  const endpoint = `${API_URL}/artists`;
  const response = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") || "")}`,
    },
  });

  if (!response.ok) {
    throw new Error("An error occurred while trying to create artist");
  }

  return response.json();
};

export const useCreateArtist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["artists"],
    mutationFn: createArtist,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["artists"],
      });
    },
  });
};
