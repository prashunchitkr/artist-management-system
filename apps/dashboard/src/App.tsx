import { BrowserRouter } from "react-router-dom";

import { AppRoutes } from "./components/routing/AppRoutes";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const user = useAuth();

  return (
    <BrowserRouter>
      <AppRoutes role={user?.role} />
    </BrowserRouter>
  );
}

export default App;
