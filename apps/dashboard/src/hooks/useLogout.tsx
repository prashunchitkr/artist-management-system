import { useLocalStorage } from "@uidotdev/usehooks";
import { LOCAL_STORAGE_KEYS } from "../core/utils/consts";

export const useLogout = () => {
  const [, setToken] = useLocalStorage(LOCAL_STORAGE_KEYS.Token, "");

  const logout = () => {
    setToken("");
  };

  return logout;
};
