import { useNavigate } from "react-router";

import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

interface IAuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: IAuthGuardProps) => {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  return <>{children}</>;
};
