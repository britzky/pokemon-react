import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({ token: null, user: null});
    
    //method to authenticate and store token and user info
    const authenticate = (token, user) => {
        setAuth({token, user});
    };

    //method to clear the auth info when the user logs out
    const logout = () => {
        setAuth({token:null, user:null});
    };

    return (
        <AuthContext.Provider value={{auth, authenticate, logout}}>
            {children}
        </AuthContext.Provider>
    )

}