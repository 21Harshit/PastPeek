import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="997236060339-sh47ptpdk91e0v1pg0g7daggs37qqoo5.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
