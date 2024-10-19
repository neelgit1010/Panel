import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserHandler = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
      if (location.pathname === "/" || location.pathname === "/register") {
        navigate("/dashboard", { replace: false });
      }
    }
  }, [location, setIsAuthenticated, navigate]);

  return null;
};

export default UserHandler;
