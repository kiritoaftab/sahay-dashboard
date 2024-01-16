import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth,setAuth] = useState({
        token:"jwt token",
        user_id:"userId",
        username:"Karan Upmanyu",
        role:"ADMIN"
    });

    //Must remove this 

    return (
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
} 

export default AuthContext;