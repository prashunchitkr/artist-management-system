import { Role } from "@ams/core";
import { Login } from "../../pages/auth/Login";
import { Signup } from "../../pages/auth/Signup";
import { Artists } from "../../pages/home/Artists";
import { Music } from "../../pages/home/Music";
import { Users } from "../../pages/home/Users";
import { Route, Routes } from "react-router-dom";
import { AuthGuard } from "../utils/AuthGuard";
import { Home } from "../../pages/Home";
import { NotFound } from "../../pages/status/NotFound";

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
        <Route path="/artists" element={<Music />} />
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
        <Route index path="/artists" element={<Artists />} />
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
        <Route path="/artists" element={<Artists />} />
        <Route path="/music" element={<Music />} />
      </Route>
      <Route path="*" element={<NotFound homeLink="/" />} />
    </Routes>
  );
};
