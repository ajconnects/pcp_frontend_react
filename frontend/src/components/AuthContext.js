import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      const userType = localStorage.getItem('user_type');
      const userId = localStorage.getItem('user_id');
      setIsLoggedIn(true);
      setUserType(userType);
      setUserId(userId);
    }
  }, []);

  const login = (userType, userId) => {
    setIsLoggedIn(true);
    setUserType(userType);
    setUserId(userId);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_type');
    localStorage.removeItem('user_id');
    setIsLoggedIn(false);
    setUserType(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userType, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};