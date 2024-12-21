import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";

interface IGuestGuardProps {
  children: React.ReactNode;
}

export const GuestGuard = ({ children }: IGuestGuardProps) => {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return <>{children}</>;
};
