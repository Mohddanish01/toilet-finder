import { createContext, useContext, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

const login = async (
  email,
  password
) => {

  const res = await api.post(
    "/auth/login",
    {
      email,
      password
    }
  );

  localStorage.setItem(
    "token",
    res.data.token
  );

  setUser(res.data);
};

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser, 
        login
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};