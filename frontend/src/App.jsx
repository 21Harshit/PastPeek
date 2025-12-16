import React, { useState, useEffect } from "react";
// import jwt_decode from "jwt-decode/build/jwt-decode";

import Login from "./components/Login";
import Header from "./components/Header";
import Dictionary from "./components/Dictionary";
import Footer from "./components/footer";
function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) setUser(token);
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  if (!user) return <Login setUser={setUser} setToken={setToken} />;

  return (
    <div>
      <Header user={user} onLogout={handleLogout} />
      <div className="container">
        <Dictionary />
      </div>
      <Footer/>
    </div>
  );
}

export default App;
