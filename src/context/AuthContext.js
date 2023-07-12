import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const useAuth = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const verifyUser = async () =>{
            if (!user || !user.token) return;
                try {
                const response = await fetch('/verify', {
                    method: 'GET',
                    credentials: 'include',
                })
                if (!response.ok) throw new Error('Not authenticated')
                
                const data = await response.json()
                setUser(data)
                setLoading(false)
            } catch(error) {
                console.error('Error authenticating user', error)
            }
        }
        verifyUser()
    }, [user])

    //method to authenticate and store token and user info
    const authenticate = (token, userData) => {
        console.log('Authenticating with: ', token, userData)
        setUser({token, ...userData})
    };

    //method to clear the auth info when the user logs out
    const logout = async () => {
        const response = await fetch('/logout', {
            method: "POST",
            credentials: 'include'
        })
        setUser(null)
    };
    return { loading, authenticate, logout, user }
}


export const AuthProvider = ({children}) => {
    const auth = useAuth()

    return (
        <AuthContext.Provider value={{auth}}>
            {children}
        </AuthContext.Provider>
    )

}