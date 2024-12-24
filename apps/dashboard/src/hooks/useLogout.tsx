import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_KEYS } from "../core/utils/consts";

export const useLogout = () => {
  const [, setToken] = useLocalStorage(LOCAL_STORAGE_KEYS.Token, "");
  const navigate = useNavigate();

  const logout = () => {
    setToken("");
    navigate("/");
  };

  return logout;
};
