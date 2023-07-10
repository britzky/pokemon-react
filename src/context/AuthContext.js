import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({ token: null, user_name: null});
    const [user, setUser] = useState({})
    
    //method to authenticate and store token and user info
    const authenticate = (token, user) => {
        console.log('Authenticating with: ', token, user)
        setAuth({token, userName: user.user_name});
        setUser(user);
    };

    //method to clear the auth info when the user logs out
    const logout = () => {
        setAuth({token:null, user_name:null});
    };

    return (
        <AuthContext.Provider value={{auth, authenticate, logout, user}}>
            {children}
        </AuthContext.Provider>
    )

}