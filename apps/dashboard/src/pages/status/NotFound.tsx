import { useNavigate } from "react-router";
import { Button } from "../../components/ui/Button";

interface INotFoundProps {
  homeLink: string;
}

export const NotFound = ({ homeLink }: INotFoundProps) => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>404 Not Found</h1>
      <Button onClick={() => navigate(homeLink)}>Go Home</Button>
    </div>
  );
};
