import { Role } from "@ams/core";
import { Outlet, Route, Routes } from "react-router-dom";
import { Login } from "../../pages/auth/Login";
import { Signup } from "../../pages/auth/Signup";
import { Home } from "../../pages/Home";
import { ArtistMusic } from "../../pages/home/artist/ArtistMusic";
import { Artists } from "../../pages/home/artist/Artists";
import { Music } from "../../pages/home/Music";
import { Users } from "../../pages/home/Users";
import { NotFound } from "../../pages/status/NotFound";
import { AuthGuard } from "../utils/AuthGuard";

interface IAppRoutesProps {
  role?: Role;
}

export const AppRoutes = ({ role }: IAppRoutesProps) => {
  if (role === Role.Artist) return <ArtistRoutes />;
  if (role === Role.ArtistManager) return <ArtistManagerRoutes />;
  if (role === Role.SuperAdmin) return <SuperAdminRoutes />;

  return <PublicRoutes />;
};

const PublicRoutes = () => {
  return (
    <Routes>
      <Route index path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

const ArtistRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthGuard>
            <Home />
          </AuthGuard>
        }
      >
        <Route index element={<Music />} />
        <Route path="/music" element={<Music />} />
      </Route>
      <Route path="*" element={<NotFound homeLink="/" />} />
    </Routes>
  );
};

const ArtistManagerRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthGuard>
            <Home />
          </AuthGuard>
        }
      >
        <Route index element={<Artists />} />
        <Route path="/artists" element={<Outlet />}>
          <Route index element={<Artists />} />
          <Route path=":id" element={<ArtistMusic />} />
        </Route>
        <Route path="/music" element={<Music />} />
      </Route>
      <Route path="*" element={<NotFound homeLink="/" />} />
    </Routes>
  );
};

const SuperAdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthGuard>
            <Home />
          </AuthGuard>
        }
      >
        <Route index element={<Users />} />
        <Route path="/users" element={<Users />} />
        <Route path="/artists" element={<Outlet />}>
          <Route index element={<Artists />} />
          <Route path=":id" element={<ArtistMusic />} />
        </Route>
        <Route path="/music" element={<Music />} />
      </Route>
      <Route path="*" element={<NotFound homeLink="/" />} />
    </Routes>
  );
};
