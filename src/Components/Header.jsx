import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import auth0 from "auth0-js";
import Button from "./Button";

function Header({ setToken, extraclasses }) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const webAuth = new auth0.WebAuth({
      domain: "techtribe.us.auth0.com",
      clientID: "ffbSF4A20lHnWOs1A6TuXpVZ0jESDGgY",
      redirectUri: "https://localhost:3000/home",
    });

    const parseAccessToken = () => {
      const hash = window.location.hash;
      const tokenIndex = hash.indexOf("access_token=");
      if (tokenIndex !== -1) {
        const endTokenIndex = hash.indexOf("&", tokenIndex);
        const accessToken = hash.substring(
             + "access_token=".length,
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
        console.log(user)
      });
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  function handleLogout(e) {
    try {
      const webAuth = new auth0.WebAuth({
        domain: "techtribe.us.auth0.com",
        clientID: "ffbSF4A20lHnWOs1A6TuXpVZ0jESDGgY",
        redirectUri: "http://localhost:3000/home",
      });

      webAuth.logout({
        domain: "techtribe.us.auth0.com",
        clientID: "ffbSF4A20lHnWOs1A6TuXpVZ0jESDGgY",
        redirectUri: "http://localhost:3000/home",
      });
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
            {userProfile.nickname}
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
