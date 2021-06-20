import React, {useState} from 'react';
import {useAuth} from "../Context/auth-context";
import { Navigate, useLocation, useNavigate, Link } from "react-router-dom";
import "./login.css";

export default function Login() {
  const { isUserLogin, loginUserWithCredentials } = useAuth();
  const { state } = useLocation();
  const [inputUsername, setUsername] = useState("");
  const [inputPassword, setPassword] = useState("");
  const navigate = useNavigate();
  return isUserLogin ? (<Navigate to ="/products" />) : (
    <>
      <div className="loginBox">
        <h1>Login</h1>   
            <form method="" action="">
                <div className="loginForm">
                    <input onChange={(e) => setUsername(e.target.value)} autoComplete="off" placeholder="username" type="username"/>
                </div>
                <div className="loginForm">
                    <input onChange={(e) => setPassword(e.target.value)} autoComplete="off" placeholder="password"  type="Password" />
                </div>
                <button type = "button" className = "btn-login" onClick={loginHandler}>Login</button>
            </form>
            <div style = {{color:"white", paddingTop:"1rem"}}>Not a user? <Link to ="/signup">Sign up</Link></div>
      </div>
    </>
  );

  function loginHandler() {
    loginUserWithCredentials(inputUsername, inputPassword);
    navigate(state?.from ? state.from : "/");
    }
  }



