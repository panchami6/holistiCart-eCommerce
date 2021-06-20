import axios from "axios";
import { createContext, useContext } from "react";
import { useState } from "react";

export const AuthContext = createContext();

function loginService(username, password) {
  console.log("calling login api")
  return axios.post("https://holistiCart.panchami6.repl.co/user/login", { email: username, password: password }
  );
}

function signUpService(newName, email, password){
  console.log("calling signup api")
  const signupInput = {name:newName, email:email, password:password}
  return axios.post("https://holistiCart.panchami6.repl.co/user/register", signupInput);

}

export const AuthProvider = ({ children }) => {
  const { isUserLoggedIn, token: savedToken, userId:savedUserId} = JSON.parse(
    localStorage?.getItem("login")
  ) || { isUserLoggedIn: false, token: null, userId: null };

  const [isUserLogin, setLogin] = useState(isUserLoggedIn);
  const [signUpSuccessful, setSignUpSuccessful] = useState(false);
  const [token, setToken] = useState(savedToken);
  const [userId, setUserId] = useState(savedUserId);

  async function signUpUserWithCredentials(newName, email, password){
    try{
      const response = await signUpService(newName, email, password)
      if (response.status === 200) {
        setSignUpSuccessful(true);
      }
    } catch(error){
      console.error(error);
  }
  }

  async function loginUserWithCredentials(username, password) {
    try {
      const response = await loginService(username, password);
      if (response.status === 200) {
        console.log({response})
        loginUser(response.data);
        // setUserId(response.data._id);
      }
    } catch (error) {
      console.log("Sahi username password nahi pata kya?", error);
    }

    function loginUser({ token, user }) {
      setToken(token);
      setLogin(true);
      console.log("userId: ",user._id)
      setUserId(user._id)
      localStorage?.setItem(
        "login",
        JSON.stringify({ isUserLoggedIn: true, token, userId: user._id })
      );
    }
  }

  function logoutUser() {
    console.log("logout")
    localStorage?.removeItem("login");
    setLogin(false);
    setToken(null);
    setUserId(null)
  }

  return (
    <AuthContext.Provider
      value={{ isUserLogin, token, loginUserWithCredentials, signUpSuccessful, signUpUserWithCredentials, logoutUser, userId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
