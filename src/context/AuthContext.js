import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const useAuth = () => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const verifyUser = async () =>{
            if (!user.token) return;
                try {
                const response = await fetch('/verify', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                if (!response.ok) throw new Error('Not authenticated')
                
                const data = await response.json()
                setUser(data)
                setLoading(false)
            } catch(error) {
                console.error('Error authenticating user', error)
            }
        }
        return verifyUser()
    }, [user.token])

    //method to authenticate and store token and user info
    const authenticate = (token, userData) => {
        console.log('Authenticating with: ', token, userData)
        setUser({token, ...userData})
    };

    //method to clear the auth info when the user logs out
    const logout = () => {
        setUser({})
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