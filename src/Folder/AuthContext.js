import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on first load
  useEffect(() => {
    const storedUser = localStorage.getItem("tastyTrackUser");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Login - store user data
  const login = (userData) => {
    localStorage.setItem("tastyTrackUser", JSON.stringify(userData));
    setUser(userData);
  };

  // Logout - remove user data
  const logout = () => {
    localStorage.removeItem("tastyTrackUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
