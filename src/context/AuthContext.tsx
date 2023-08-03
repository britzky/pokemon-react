import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const useAuth = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const verifyUser = async () =>{
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
            } finally {
                setLoading(false)
            }
        }
        verifyUser()
    }, [])

    //method to authenticate and store token and user info
    const authenticate = (token: string, userData: any) => {
        console.log('Authenticating with: ', token, userData)
        setUser({token, ...userData})

        //add username to local storage
        localStorage.setItem('username', userData.user_name)
    };

    //method to clear the auth info when the user logs out
    const logout = async () => {
        await fetch('/logout', {
            method: "POST",
            credentials: 'include'
        })
        setUser(null)

        //remove username from local storage
        localStorage.removeItem('username');
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