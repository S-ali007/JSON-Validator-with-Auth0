import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import All_Components from "./Components/All_Components";
import SignupPage from "./Features/Signup";
import LoginPopup from "./Features/LoginPopup";
import Page_404 from "./Components/Page_404";
import { Link, useNavigate } from "react-router-dom";


function App() {
  const [token, setToken] = useState(null);
  const [data, setdata] = useState("");
  const navigate = useNavigate();


  const storedToken = sessionStorage.getItem("username");
  console.log(storedToken)
  // useEffect(() => {
  //   if (storedToken) {
  //     setToken(storedToken);
  //     // navigate("/")
       
  //   }
  // }, [storedToken]);

  return (    
    <>
      <Routes>
        <Route path={"/signup"} element={<SignupPage />} />
        
        {storedToken ? <Route path={"/home"} element={<All_Components setdata={setdata} />} />: <Route path={"/"} element={<LoginPopup setToken={setToken} />} />}
        <Route path="/*" element={<Page_404 />} />
      </Routes>
    </>
  );
}

export default App;
