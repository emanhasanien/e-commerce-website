

import React, { useContext } from 'react'
import { AuthContext } from '../AuthContext/AuthContext'
import Home from '../Home/Home'

export default function ProtectedLogin( { children }) {

    let {isUserLoggedIn  } = useContext(AuthContext)

    if( !isUserLoggedIn){
           
        return children

    }
    else{
        return <Home/>
    }
 
}
