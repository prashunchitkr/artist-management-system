import { IUpdateUserRequest, IUserResponse } from "@ams/core";
import { API_URL } from "../../../core/utils/consts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateUser = async (
  id: number,
  data: IUpdateUserRequest,
): Promise<IUserResponse> => {
  const endpoint = `${API_URL}/users/${id}`;

  const response = await fetch(endpoint, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") || "")}`,
    },
  });

  if (!response.ok) {
    throw new Error("An error occurred while trying to update user");
  }

  return response.json();
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["users"],
    mutationFn: (data: { id: number; data: IUpdateUserRequest }) =>
      updateUser(data.id, data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};
