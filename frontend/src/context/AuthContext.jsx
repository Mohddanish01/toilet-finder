import { createContext, useContext, useState, useEffect} from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async ( // for login
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


  const signup = async ( // sign up
    name,
    email,
    password
  ) => {

    await api.post(
      "/auth/signup",
      {
        name,
        email,
        password
      }
    );
  };


  const logout = () => {  // for logout

    localStorage.removeItem("token");

    setUser(null);
  };


  useEffect(() => {

    const loadUser = async () => {

      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {

        const res = await api.get("/auth/me");

        setUser(res.data.user);

      } catch (error) {

        console.log(error);

        localStorage.removeItem("token");

      } finally {

        setLoading(false);
      }
    };

    loadUser();

  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser, 
        login,
        signup,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};