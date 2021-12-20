import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./LoginComponent.css";
import axios from "axios";
const LoginComponent = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    const logged = window.localStorage.getItem("loggedUser");
    if(logged){
      var loggedUser=JSON.parse(logged);
      if (typeof loggedUser === 'string')setUser(JSON.parse(loggedUser));
      else{
        setUser(loggedUser);
      }
    }
  }, [])

  const Login = () => {
    let errorList = [];
    if (username !== "" && password !== "") {
      axios
        .post(`http://localhost:3001/login`, {
          username: username,
          password: password,
        })
        .then((res) => {
          const result = res.data[0] ?? res.data.message;
          if (result.idUsers) {
            setUser(result);
          }else {
            errorList.push(result);
            setErrors(errorList);
          }
        })}
         else {
      if (username === "") errorList.push("Enter a username");
      if (password === "") errorList.push("Enter a password");
      setErrors(errorList);
    }
  };

  useEffect(() => {
   if(user.username!= undefined){
     handleLogin(user);
     navigate("/");
   }
  }, [user])

  const GotoRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container">
      <div className="Login">
        <h1>Login to RedoMap</h1>
        <hr />
        <div className="field">
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <button id="login" onClick={Login}>
          Login
        </button>
        <hr />
        {errors.length > 0 && (
          <div className="errorsSummary">
            {errors.map((error) => (
              <div className="error">{error}</div>
            ))}
          </div>
        )}
        <label><i>You don't have an account?</i></label>
        <button id="register" onClick={GotoRegister}>
          Register
        </button>
        <h1>{user.username}</h1>
      </div>
    </div>
  );
};
export default LoginComponent;
