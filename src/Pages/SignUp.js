import React, { useState } from 'react';
import {useAuth} from "../Context/auth-context";
import { Navigate, useNavigate, Link } from "react-router-dom";
import "./login.css";
// import {signUpService} from "../Context/auth-context"

export default function SignUp() {
  const [newName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setNewPassword] = useState("");
  const { signUpSuccessful, signUpUserWithCredentials } = useAuth();
  const navigate = useNavigate();

  return signUpSuccessful ? (<Navigate to ="/login" />) : (
    <>
      <div className="loginBox">
        <h1>SignUp</h1>   
            <form>
                <div className="loginForm">
                    <input onChange = {(e) => setName(e.target.value)} autoComplete="off" placeholder="name"/>
                </div>
                <div className="loginForm">
                    <input onChange = {(e) => setEmail(e.target.value)} autoComplete="off" placeholder="email"/>
                </div>
                <div className="loginForm">
                    <input onChange = {(e) => setNewPassword(e.target.value)} autoComplete="off" placeholder="password"  type="Password" />
                </div>
                <button onClick = {signUpHandler} type="button" className = "btn-login">SignUp</button>
            </form>
            <div style = {{color:"white", paddingTop:"1rem"}}>Already have an account? <Link to ="/login">Login</Link></div>
      </div>
    </>
  );

  function signUpHandler() {
    signUpUserWithCredentials(newName, email, password);
    }
}


// signUpUserWithCredentials(newName, email, password);

