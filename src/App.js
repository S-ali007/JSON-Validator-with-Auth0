import React, { useState, useEffect } from "react";
import { useNavigate, Route, Routes, json, useLocation } from "react-router-dom";

import All_Components from "./Components/All_Components";
import SignupPage from "./Features/Signup";
import LoginPopup from "./Features/LoginPopup";
import Page_404 from "./Components/Page_404";
import { useAuth0 } from "@auth0/auth0-react";
import auth0 from "auth0-js";

function App() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userProfile, setUserProfile] = useState(null);
  const [token, setToken] = useState(null);
  const [data, setdata] = useState("");
  const navigate = useNavigate();
  const userdata = JSON.parse(sessionStorage.getItem("username"))

  useEffect(() => {
    const webAuth = new auth0.WebAuth({
      domain: "techtribe.us.auth0.com",
      clientID: "ffbSF4A20lHnWOs1A6TuXpVZ0jESDGgY",
      redirectUri: "https://https://melodic-cassata-2af0ea.netlify.app/home",
    });
    const parseAccessToken = () => {
      const hash = window.location.hash;
      const tokenIndex = hash.indexOf("access_token=");
      if (tokenIndex !== -1) {
        const endTokenIndex = hash.indexOf("&", tokenIndex);
        const accessToken = hash.substring(
          tokenIndex + "access_token=".length,
          endTokenIndex !== -1 ? endTokenIndex : undefined
        );
        return accessToken;
      }
      return null;
    };

    const accessToken = parseAccessToken();
    if (accessToken) {
      webAuth.client.userInfo(accessToken, function (err, user) {
        if (err) {
          console.error("Error fetching user profile:", err);
          return;
        }

        // Store the user profile in state
        setUserProfile(user);

        sessionStorage.setItem("username", JSON.stringify(user));
        console.log(user, "ali");
        
      });


    
    
    }


    if (!userdata){
      navigate("/");
    }  
     }, []);

  return (
    <>
      <Routes>
        <Route path={"/signup"} element={<SignupPage />} />
        <Route path={"/"} element={<LoginPopup setToken={setToken} />} />
        <Route path={"/home"} element={<All_Components setdata={setdata} />} />
        <Route path="/*" element={<Page_404 />} />
      </Routes>
    </>
  );
}

export default App;
