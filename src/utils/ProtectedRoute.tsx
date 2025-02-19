import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth"; 

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
