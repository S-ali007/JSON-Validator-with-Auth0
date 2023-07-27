import React from 'react'
import { Navigate } from 'react-router-dom'

function AuthComp({children}) {

    const uData =JSON.parse(sessionStorage.getItem("username"))
    console.log(uData)
        if(uData){
            return children
            
        }
        else{
           return <Navigate to='/'/>
        }

}

export default AuthComp
