import React, { useEffect,useState } from 'react'
import { Navigate } from 'react-router-dom'
import auth0 from "auth0-js";



function AuthComp({children}) {

    // const [userProfile, setUserProfile] = useState(null);

    // useEffect(()=>{
    //     const webAuth = new auth0.WebAuth({
    //         domain: "techtribe.us.auth0.com",
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
    //         console.log(sessionStorage.getItem("username"),`sessionStorage.getItem("username")`)
    //       });
          
    //       if (uData) {
    //         // navigate("/home");
    //         console.log("xxxxxxgxx")
    //       }
    //     }
        
    // },[])
    const uData =JSON.parse(sessionStorage.getItem("username"))
  
    console.log(uData)
        if(uData){
            return children
            
        }
        else{
           return <Navigate to='/home'/>
        }

}

export default AuthComp
