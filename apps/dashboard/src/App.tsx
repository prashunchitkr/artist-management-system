import { BrowserRouter, Route, Routes } from "react-router";

import { AuthGuard } from "./components/utils/AuthGuard";
import { GuestGuard } from "./components/utils/GuestGuard";
import { AuthProvider } from "./contexts/AuthContext";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { Home } from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <AuthGuard>
                  <Home />
                </AuthGuard>
              }
            />
            <Route
              path="/login"
              element={
                <GuestGuard>
                  <Login />
                </GuestGuard>
              }
            />
            <Route
              path="/signup"
              element={
                <GuestGuard>
                  <Signup />
                </GuestGuard>
              }
            />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
