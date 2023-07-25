// App.js
import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import All_Components from "./Components/All_Components";
import SignupPage from "./Features/Signup";
import LoginPopup from "./Features/LoginPopup";
import Page_404 from "./Components/Page_404";
import HigherOrderRoutes from "./HigherOrderRoutes";
function App() {
  const [token, setToken] = useState(null);
  const [data, setdata] = useState("");

  const storedToken = sessionStorage.getItem("username");

  useEffect(() => {
    if (storedToken) {
      setToken(storedToken);
    }
  }, [storedToken]);

  return (
    <>
      <HigherOrderRoutes token={token} />
    </>
  );
}

export default App;
