import { IUser } from "@ams/core";
import { useLocalStorage } from "@uidotdev/usehooks";
import React, { createContext, useContext } from "react";
import { LOCAL_STORAGE_KEYS } from "../core/utils/consts";

type AuthContextType = Omit<
  IUser,
  "password" | "created_at" | "updated_at"
> | null;

const AuthContext = createContext<AuthContextType>(null);

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [token] = useLocalStorage(LOCAL_STORAGE_KEYS.Token, "");
  const decodedToken: AuthContextType | null = token
    ? JSON.parse(atob(token.split(".")[1]))
    : null;

  return (
    <AuthContext.Provider value={decodedToken}>{children}</AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
