import { Role } from "@ams/core";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { RenderForRole } from "../utils/RenderForRole";

interface INavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink = ({ to, children }: INavLinkProps) => {
  return (
    <li className="p-1 bg-blue-200 hover:cursor-pointer">
      <Link to={to}>{children}</Link>
    </li>
  );
};

export const Navigation = () => {
  const logout = useLogout();
  return (
    <nav>
      <ul className="flex space-x-4">
        <NavLink to="/">Home</NavLink>
        <RenderForRole allowedRoles={[Role.SuperAdmin]}>
          <NavLink to="/users">Users</NavLink>
        </RenderForRole>
        <RenderForRole allowedRoles={[Role.SuperAdmin, Role.ArtistManager]}>
          <NavLink to="/artists">Artists</NavLink>
        </RenderForRole>
        <RenderForRole allowedRoles={[Role.Artist]}>
          <NavLink to="/music">Albums</NavLink>
        </RenderForRole>

        <div className="p-1 bg-red-200 hover:cursor-pointer" onClick={logout}>
          Logout
        </div>
      </ul>
    </nav>
  );
};
