// HigherOrderRoutes.js
import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import All_Components from "./Components/All_Components";
import SignupPage from "./Features/Signup";
import LoginPopup from "./Features/LoginPopup";
import Page_404 from "./Components/Page_404";

function HigherOrderRoutes({ token }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to /home if the token exists
    if (token) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <Routes>
      <Route path={"/signup"} element={<SignupPage />} />
      <Route path={"/"} element={<LoginPopup />} />
      <Route path={"/home"} element={<All_Components />} />
      <Route path={"/*"} element={<Page_404 />} />
    </Routes>
  );
}

export default HigherOrderRoutes;
