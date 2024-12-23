import { Link } from "react-router-dom";

interface INotFoundProps {
  homeLink: string;
}

export const NotFound = ({ homeLink }: INotFoundProps) => {
  return (
    <div>
      <h1>404 Not Found</h1>
      <Link to={homeLink}>Home</Link>
    </div>
  );
};
