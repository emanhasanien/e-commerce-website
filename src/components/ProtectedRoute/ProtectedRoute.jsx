

import  { useContext } from 'react'
import { AuthContext } from '../AuthContext/AuthContext'
import Login from '../Login/Login'

export default function ProtectedRoute({ children }) {
 

    let {isUserLoggedIn  } = useContext(AuthContext)

    if(isUserLoggedIn === true){
        return  children 
    }
    else{

        return <Login/>
    }
}
