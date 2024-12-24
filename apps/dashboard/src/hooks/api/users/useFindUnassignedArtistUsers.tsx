import { IFindUnassignedArtistUsersResponse } from "@ams/core";
import { API_URL } from "../../../core/utils/consts";
import { useQuery } from "@tanstack/react-query";

const findUnassignedArtistUsers = async (): Promise<
  IFindUnassignedArtistUsersResponse[]
> => {
  const endpoint = `${API_URL}/users/unassigned-artists`;

  const response = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") || "")}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      "An error occurred while trying to fetch unassigned artist users",
    );
  }

  return response.json();
};

export const useFindUnassignedArtistUsers = () => {
  return useQuery({
    queryKey: ["users", "unassigned-artists"],
    queryFn: findUnassignedArtistUsers,
  });
};
