import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import All_Components from "./Components/All_Components";
import SignupPage from "./Features/Signup";
import LoginPopup from "./Features/LoginPopup";
import Page_404 from "./Components/Page_404";

function App() {
  const [token, setToken] = useState(null);
  const [data, setdata] = useState("");

  // Get the URL location and query parameters
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlToken = queryParams.get("token");

  useEffect(() => {
    // If the token is present in the URL, save it to local storage
    if (urlToken) {
      setToken(urlToken);
      localStorage.setItem("accessToken", urlToken);

      // Remove the token from the URL to prevent security issues
      const urlWithoutToken = location.pathname;
      window.history.replaceState({}, document.title, urlWithoutToken);
    } else {
      // If the token is not present in the URL, check local storage
      const storedToken = localStorage.getItem("accessToken");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, [urlToken, location.pathname]);

  return (
    <>
      <Routes>
        <Route path={"/signup"} element={<SignupPage />} />
        <Route
          path={"/"}
          element={token ? <All_Components setdata={setdata} /> : <LoginPopup setToken={setToken} />}
        />
        <Route path={"/home"} element={<All_Components setdata={setdata} />} />
        <Route path="/*" element={<Page_404 />} />
      </Routes>
    </>
  );
}

export default App;
