import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("userId") ? true : false
  );

  const login = (userId) => {
    localStorage.setItem("userId", userId);
    setUserId(userId);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.clear();
    setUserId(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ userId, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
