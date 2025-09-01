import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Login = ({ setUser, setToken }) => {
  const handleLogin = async (credentialResponse) => {
    try {
      const { data } = await axios.post("https://pastpeek.onrender.com/api/google-login", {
        token: credentialResponse.credential
      });
      setToken(data.jwt);
      setUser(data.user);
      localStorage.setItem("token", data.jwt);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100vh", background:"linear-gradient(to right, #654b8bff, #72cb2aff)"}}>
      <h1 style={{color:"white", marginBottom:"20px"}}>PastPeek</h1>
      <GoogleLogin onSuccess={handleLogin} onError={() => console.log("Login Failed")} />
    </div>
  );
};

export default Login;
