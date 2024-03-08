import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // Initialize state from local storage
  const [userCredentials, setUserCredentials] = useState(() => {
    const storedCredentials = localStorage.getItem('userCredentials');
    return storedCredentials ? JSON.parse(storedCredentials) : { username: "", email: "", password: "" };
  });

  // Update local storage when userCredentials change
  useEffect(() => {
    localStorage.setItem('userCredentials', JSON.stringify(userCredentials));
  }, [userCredentials]);

  const value = { userCredentials, setUserCredentials };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
