import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import All_Components from "./Components/All_Components";
import SignupPage from "./Features/Signup";
import LoginPopup from "./Features/LoginPopup";
import Page_404 from "./Components/Page_404";

function App() {
  const [token, setToken] = useState(null);
  const [data, setdata] = useState("");


  useEffect(() => {
  const storedToken = sessionStorage.getItem("username");

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (    
    <>
      <Routes>
        <Route path={"/signup"} element={<SignupPage />} />
       <Route path={"/"} element={<LoginPopup setToken={setToken} />} />
      {token && <Route path={"/home"} element={<All_Components setdata={setdata} />} />}
        <Route path={"/*"} element={<Page_404 />} />
      </Routes>
    </>
  );
}

export default App;
