import useAuth from "../authentication-hook/useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      setAuth(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId")
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return logout;
};

export default useLogout;
