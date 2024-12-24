import { ICreateUserRequest, IUserResponse } from "@ams/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../../core/utils/consts";

const createUser = async (data: ICreateUserRequest): Promise<IUserResponse> => {
  const endpoint = `${API_URL}/users`;
  const response = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") || "")}`,
    },
  });

  if (!response.ok) {
    throw new Error("An error occurred while trying to create user");
  }

  return response.json();
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["users"],
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};
