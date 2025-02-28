/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import { useEffect, useState } from "react";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const role = useRole();
  const { user, loading } = useAuth();
  const [isRoleFetched, setIsRoleFetched] = useState(false);

  useEffect(() => {
    if (role) {
      setIsRoleFetched(true);
    }
  }, [role]);
  if (loading || !isRoleFetched) {
    return <Loader />;
  }

  if (!user?.email) {
    navigate("/");
    return null;
  }

  if (role === "admin") {
    return children;
  } else {
    navigate("/");
    return null;
  }
};

export default PrivateRoute;
