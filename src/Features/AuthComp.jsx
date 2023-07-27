import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

function AuthComp({children}) {
    useEffect(()=>{
    console.log(sessionStorage.getItem("username"),`sessionStorage.getItem("username")`)
    },[])
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
