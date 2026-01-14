import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

const PublicRoute = () => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoute;
