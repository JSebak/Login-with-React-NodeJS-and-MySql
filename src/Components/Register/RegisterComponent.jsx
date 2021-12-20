import React, { useState } from "react";
import { useNavigate } from "react-router";
import Axios from "axios";
import "./RegisterComponent.css"
const RegisterCompnent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);


  const navigate = useNavigate();
  let errorList = [];

  const Register = () => {
    if (username.length > 0 && password.length > 0) {
      Axios.post("http://localhost:3001/register", {
        username,
        password,
      }).then((response) => {
        console.log(response);
        alert("Succesfull Registration!");
        navigate("/login");
      });
    }
    else{
        username.length===0 ? errorList.push("Please enter a Username"): errorList.filter(e=>e !== "Please enter a Username");
        password.length===0 ? errorList.push("Please enter a Password") : errorList.filter(e=>e !== "Please enter a Password");
        setErrors(errorList);
    }
  };
  const Back=()=>{
    navigate("/");
  }

  return (
    <div className="Regcontainer">
      <h1>Welcome please enter your info!</h1>
      <div className="Register">
        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button id="register" onClick={Register}>Register</button>
      </div>
      <button id="back" onClick={Back}>Go back</button>
      <ul className="ErrorSummary">
          {errors.map((error,index) => (<li key={index}>{error}</li>))}
      </ul>
    </div>
  );
};
export default RegisterCompnent;
