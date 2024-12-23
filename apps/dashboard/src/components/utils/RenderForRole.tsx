import { Role } from "@ams/core";
import { useAuth } from "../../contexts/AuthContext";

interface IRenderForRoleProps {
  allowedRoles: Role[];
  children: React.ReactNode;
}

export const RenderForRole = ({
  allowedRoles,
  children,
}: IRenderForRoleProps) => {
  const user = useAuth();

  if (!user) {
    return null;
  }

  if (allowedRoles.includes(user.role)) {
    return <>{children}</>;
  }

  return null;
};
