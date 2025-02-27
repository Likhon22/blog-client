/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const role = useRole();
  const { user, loading } = useAuth();
  if (loading) {
    return <Loader />;
  }
  if (user?.email && role === "admin") {
    return children;
  }
  if (user?.email && role !== "admin") {
    navigate("/");
    return null;
  }
};

export default PrivateRoute;
