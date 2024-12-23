import { useMutation } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";

import { IAuthResponse, ISignupRequest } from "@ams/core";
import { API_URL, LOCAL_STORAGE_KEYS } from "../../core/utils/consts";
import { useNavigate } from "react-router-dom";

const signup = async (payload: ISignupRequest): Promise<IAuthResponse> => {
  const endpoint = `${API_URL}/auth/signup`;

  const response = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("An error occurred while trying to signup");
  }

  return response.json();
};

export const useSignup = () => {
  const navigate = useNavigate();
  const [, setToken] = useLocalStorage(LOCAL_STORAGE_KEYS.Token, "");

  return useMutation({
    mutationKey: ["user"],
    mutationFn: signup,
    onSuccess: (data) => {
      setToken(data.token);
      navigate("/");
    },
  });
};
