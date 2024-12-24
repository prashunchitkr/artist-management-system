import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../../core/utils/consts";

const importArtists = async (file: File): Promise<void> => {
  const formData = new FormData();
  formData.append("file", file);

  const endpoint = `${API_URL}/artists/import-csv`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") || "")}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("An error occurred while trying to import artists");
  }
};

export const useImportArtists = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["artists"],
    mutationFn: importArtists,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["artists"],
      });
    },
  });
};
