import { useContext, useEffect } from "react";

import { Navigate, useLocation } from "react-router-dom";

import { AuthContext } from "../contexts/AuthProvider";
import Spinner from "../components/Spinner";

const PrivateRoute = ({ children }) => {
  const { user, loading, setLoading } = useContext(AuthContext);
  setLoading(false)
  const location = useLocation();
  useEffect(() => {
    if (user?.email) {
      setLoading(false);
    }
  }, [user?.email]);
  if (loading) {
    return <Spinner></Spinner>;
  }
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={location?.pathname}
        replace={true}
      ></Navigate>
    );
  }
  return <div>{children}</div>;
};

export default PrivateRoute;
