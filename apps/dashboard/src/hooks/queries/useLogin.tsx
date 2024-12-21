import { useMutation } from "@tanstack/react-query";

import { ILoginRequest, ILoginResponse } from "@ams/core";
import { useLocalStorage } from "@uidotdev/usehooks";
import { API_URL, LOCAL_STORAGE_KEYS } from "../../core/utils/consts";

const login = async (payload: ILoginRequest): Promise<ILoginResponse> => {
  const endpoint = `${API_URL}/auth/login`;
  console.debug(endpoint);
  const response = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("An error occurred while trying to login");
  }

  return response.json();
};

export const useLogin = () => {
  const [, setToken] = useLocalStorage(LOCAL_STORAGE_KEYS.Token, "");

  return useMutation({
    mutationKey: ["user"],
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.token);
    },
  });
};
