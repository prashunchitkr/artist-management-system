import { Role } from "@ams/core";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router";

interface IRoleGuardProps {
  children: React.ReactNode;
  allowedRoles: Role[];
}

export const RoleGuard = ({ children, allowedRoles }: IRoleGuardProps) => {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (user && !allowedRoles.includes(user.role)) {
      navigate("/");
    }
  }, [user, allowedRoles, navigate]);

  return <>{children}</>;
};
