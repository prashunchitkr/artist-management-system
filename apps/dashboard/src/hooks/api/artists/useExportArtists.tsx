import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../../core/utils/consts";

const exportArtists = async () => {
  const endpoint = `${API_URL}/artists/export-csv`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") || "")}`,
    },
  });

  if (!response.ok) {
    throw new Error("An error occurred while trying to export artists");
  }

  return response.blob();
};

export const useExportArtists = () => {
  return useQuery({
    queryKey: ["artists", "export"],
    queryFn: exportArtists,
    enabled: false,
  });
};
