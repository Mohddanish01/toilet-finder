import { createContext, useContext, useState, useEffect} from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

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
    console.log(localStorage.getItem("token"));
  };

  useEffect(() => {

    const loadUser = async () => {

      const token =
        localStorage.getItem("token");

      if (!token) return;

      try {

        const res =
          await api.get("/auth/me");

        setUser(res.data.user);

      } catch (error) {

        console.log(error);

        localStorage.removeItem(
          "token"
        );
      }
    };

    loadUser();

  }, []);

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