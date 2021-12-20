import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css"

export default function NotFound() {
    const navigate = useNavigate();
    const RedirectToLogin = ()=>{
        navigate("/");
    }
  return (
    <div className="NFcontainer">
      <div className="message">
        <h1>Wops! seems like you are lost...</h1>
        <button onClick={RedirectToLogin}>Go Back</button>
      </div>
    </div>
  );
}
