import { useQuery } from "@tanstack/react-query";

import { IGetAllUsersResponse } from "@ams/core";
import { API_URL } from "../../../core/utils/consts";

const getUsers = async (
  take: number,
  skip: number,
): Promise<IGetAllUsersResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.set("take", take.toString());
  queryParams.set("skip", skip.toString());

  const endpoint = `${API_URL}/users?${queryParams.toString()}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") || "")}`,
    },
  });

  if (!response.ok) {
    throw new Error("An error occurred while trying to get users");
  }

  return response.json();
};

export const useGetAllUsers = (skip: number, take: number) => {
  return useQuery({
    queryKey: ["users", skip, take],
    queryFn: () => getUsers(take, skip),
  });
};
