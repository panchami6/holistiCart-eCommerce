import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { fakeAuthApi } from "../Components/fakeAuthApi";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLogin, setLogin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const loginStatus = JSON.parse(localStorage?.getItem("login"));

    loginStatus?.isUserLoggedIn && setLogin(true);
  }, []);

  async function loginUserWithCredentials(username, password) {
    try {
      const response = await fakeAuthApi(username, password);
      if (response.success) {
        setLogin(true);
        localStorage?.setItem(
          "login",
          JSON.stringify({ isUserLoggedIn: true })
        );
      }
    } catch (error) {
      console.log("Please enter valid username and password", error);
    }
  }

  function logoutUser() {
    setLogin(false);
    localStorage.removeItem("login");
    navigate("/products");
  }

  return (
    <AuthContext.Provider
      value={{ isUserLogin, loginUserWithCredentials, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
