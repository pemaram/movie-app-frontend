import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    return token ? { accessToken: token, id: userId } : null;
  });

  useEffect(() => {
    if (auth?.accessToken && auth?.id) {
      localStorage.setItem("accessToken", auth.accessToken);
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
    }
  }, [auth]);


  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
