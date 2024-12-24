import { useMutation } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";

import { ILoginRequest, ILoginResponse } from "@ams/core";
import { API_URL, LOCAL_STORAGE_KEYS } from "../../../core/utils/consts";

const login = async (payload: ILoginRequest): Promise<ILoginResponse> => {
  const endpoint = `${API_URL}/auth/login`;
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
  const navigate = useNavigate();
  const [, setToken] = useLocalStorage(LOCAL_STORAGE_KEYS.Token, "");

  return useMutation({
    mutationKey: ["user"],
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.token);
      navigate("/");
    },
  });
};
