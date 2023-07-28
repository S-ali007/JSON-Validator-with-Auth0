// import React, { useState, useEffect } from "react";
// import {
//   useNavigate,
//   Route,
//   Routes,
//   json,
//   useLocation,
// } from "react-router-dom";
// import All_Components from "./Components/All_Components";
// import SignupPage from "./Features/Signup";
// import LoginPopup from "./Features/LoginPopup";
// import Page_404 from "./Components/Page_404";
// import { useAuth0 } from "@auth0/auth0-react";
// import auth0 from "auth0-js";
// import AuthComp from "./Features/AuthComp";

// function App() {
//   const { isAuthenticated, getAccessTokenSilently } = useAuth0();
//   const [userProfile, setUserProfile] = useState(null);
//   const [token, setToken] = useState(null);
//   const [data, setdata] = useState("");
//   const navigate = useNavigate();
//   const uData = JSON.parse(sessionStorage.getItem("username"));

//   const [loader, setloader] = useState(false);

//   useEffect(() => {
//     const webAuth = new auth0.WebAuth({
//       domain: "techtribe.us.auth0.com",
//       clientID: "ffbSF4A20lHnWOs1A6TuXpVZ0jESDGgY",
//       redirectUri: "https://https://melodic-cassata-2af0ea.netlify.app/home",
//     });
//     const parseAccessToken = () => {
//       const hash = window.location.hash;
//       const tokenIndex = hash.indexOf("access_token=");
//       if (tokenIndex !== -1) {
//         const endTokenIndex = hash.indexOf("&", tokenIndex);
//         const accessToken = hash.substring(
//           tokenIndex + "access_token=".length,
//           endTokenIndex !== -1 ? endTokenIndex : undefined
//         );
//         return accessToken;
//       }
//       return null;
//     };

//     const accessToken = parseAccessToken();
//     if (accessToken) {
//       webAuth.client.userInfo(accessToken, function (err, user) {
//         if (err) {
//           console.error("Error fetching user profile:", err);
//           return;
//         }

//         // Store the user profile in state
//         setUserProfile(user);
//         sessionStorage.setItem("username", JSON.stringify(user));
//         console.log(user, "ali");
//       });

//       if (uData) {
//         // navigate("/home");
//         console.log("xxxxxxgxx");
//       }
//     }
//   }, []);

//   console.log(loader);
//   return (
//     <>
//       <Routes>
//         <Route
//           path={"/signup"}
//           element={<SignupPage setloader={setloader} />}
//         />
//         <Route path={"/"} element={<LoginPopup setToken={setUserProfile} />} />
//         <Route
//           path={"/home"}
//           element={<All_Components setdata={setUserProfile} />}
//         />
//         {/* <Route path={"/*"} element={<Page_404 loader={loader} />} /> */}
//       </Routes>
//     </>
//   );
// }

// export default App;







// App.js--------------------------------------------------2
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Auth0Provider } from "@auth0/auth0-react";
// import All_Components from "./Components/All_Components";
// import SignupPage from "./Features/SignupPage";
// import LoginPopup from "./Features/LoginPopup";
// import Page_404 from "./Components/Page_404";

// const domain = "techtribe.us.auth0.com";
// const clientId = "ffbSF4A20lHnWOs1A6TuXpVZ0jESDGgY";

// function App() {
//   return (
//     <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
//       <Router>
//         <Routes>
//           <Route path="/" element={<LoginPopup />} />
//           <Route path="/signup" element={<SignupPage />} />
//           <Route path="/home" element={<All_Components />} />
//           <Route path="/*" element={<Page_404 />} />
//         </Routes>
//       </Router>
//     </Auth0Provider>
//   );
// }

// export default App;




// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import All_Components from "./Components/All_Components";
import SignupPage from "./Features/SignupPage";
import LoginPopup from "./Features/LoginPopup";
import Page_404 from "./Components/Page_404";

const domain = "techtribe.us.auth0.com";
const clientId = "ffbSF4A20lHnWOs1A6TuXpVZ0jESDGgY";

// PrivateRoute component for protected routes
function PrivateRoute({ children, ...rest }) {
  const { isAuthenticated } = useAuth0();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <LoginPopup redirectTo={location.pathname} />
        )
      }
    />
  );
}

function App() {
  return (
    <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPopup />} />
          <Route path="/signup" element={<SignupPage />} />
          <PrivateRoute path="/home" element={<All_Components />} />
          <Route path="/*" element={<Page_404 />} />
        </Routes>
      </Router>
    </Auth0Provider>
  );
}

export default App;


