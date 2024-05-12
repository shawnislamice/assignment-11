import { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";

import { AuthContext } from "../contexts/AuthProvider";
import Spinner from "../components/Spinner";
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <Spinner></Spinner>;
  }
  if (!user) {
    return <Navigate to="/login" state={location?.pathname}></Navigate>;
  }
  return <div>{children}</div>;
};

export default PrivateRoute;
