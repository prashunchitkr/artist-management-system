import { Outlet } from "react-router";
import { Button } from "../components/ui/Button";
import { useLogout } from "../hooks/useLogout";

export const Home = () => {
  const logout = useLogout();
  return (
    <div>
      <div>
        <div className="text-3xl underline">Home</div>
        <Button onClick={logout}>Logout</Button>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
