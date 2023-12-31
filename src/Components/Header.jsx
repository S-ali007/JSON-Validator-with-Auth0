import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import auth0 from "auth0-js";
import Button from "./Button";
import { json } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";


function Header({ setToken, extraclasses }) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userProfile, setUserProfile] = useState(null);
    const uData = JSON.parse(sessionStorage.getItem("username"));

  const navigate = useNavigate();


  // useEffect(() => {
  //   const webAuth = new auth0.WebAuth({
  //     domain: "techtribe.us.auth0.com",
  //     clientID: "ffbSF4A20lHnWOs1A6TuXpVZ0jESDGgY",
  //     redirectUri: "https://https://melodic-cassata-2af0ea.netlify.app/home",
  //   });

  //   const parseAccessToken = () => {
  //     const hash = window.location.hash;
  //     const tokenIndex = hash.indexOf("access_token=");
  //     if (tokenIndex !== -1) {
  //       const endTokenIndex = hash.indexOf("&", tokenIndex);
  //       const accessToken = hash.substring(
  //         tokenIndex + "access_token=".length,
  //         endTokenIndex !== -1 ? endTokenIndex : undefined
  //       );
  //       return accessToken;
  //     }
  //     return null;
  //   };

  //   const accessToken = parseAccessToken();
  //   if (accessToken) {
  //     webAuth.client.userInfo(accessToken, function (err, user) {
  //       if (err) {
  //         console.error("Error fetching user profile:", err);
  //         return;
  //       }

  //       // Store the user profile in state
  //       setUserProfile(user);
  
  //       sessionStorage.setItem("username",user.sub)
  //       console.log(user)
  //     });
  //   }
  // }, [isAuthenticated, getAccessTokenSilently]);
  
  useEffect(()=>{

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

      if (uData) {
        // navigate("/home");
        console.log("xxxxxxgxx");
      }
    }

    const userInfo = JSON.parse(sessionStorage.getItem("username"))
    console.log(userInfo,'ali007') 
    setUserProfile(userInfo)
  
  },[])



  function handleLogout(e) {
    try {
      const webAuth = new auth0.WebAuth({
        domain: "techtribe.us.auth0.com",
        clientID: "ffbSF4A20lHnWOs1A6TuXpVZ0jESDGgY",
        redirectUri: "https://melodic-cassata-2af0ea.netlify.app/",
      });

      webAuth.logout({
        domain: "techtribe.us.auth0.com",
        clientID: "ffbSF4A20lHnWOs1A6TuXpVZ0jESDGgY",
        redirectUri: "https://melodic-cassata-2af0ea.netlify.app/",
      });
      sessionStorage.clear()
      // navigate("/");
      
    } catch (error) {
      console.error("Error Logging:", error);
    }
  }

  return (
    <div className="font-Anton flex justify-between items-center flex-wrap">
      <h1 className="text-[40px] font-bold bg-sky-500 text-white border-[2px] pl-2 pr-[2px] rounded-[13px]">
        <a href="/home">
          JSON{" "}
          <span className="bg-[white] text-sky-500 p-[6px] rounded-[10px]">
            Validator
          </span>{" "}
        </a>
      </h1>
      <div className="flex items-center gap-4 max-w-[300px] w-full">
        {userProfile && (
          <h1 className="font-serif text-[25px] rounded-[10px] text-center tracking-wide border-[2px] max-w-[300px] w-full bg-sky-500 text-white">
            {userProfile.name}
          </h1>
        )}
        <Button
          extraclasses="w-[130px]"
          text="Log Out"
          handleclick={handleLogout}
        />
      </div>
    </div>
  );
}

export default Header;
