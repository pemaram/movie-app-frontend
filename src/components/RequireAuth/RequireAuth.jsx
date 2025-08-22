import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/authentication-hook/useAuth";

const RequireAuth = () => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();

  const storedAccessToken = localStorage.getItem("accessToken");

  if (!auth?.accessToken && storedAccessToken) {
    setAuth({ accessToken: storedAccessToken });
  }

  return auth?.accessToken || storedAccessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
