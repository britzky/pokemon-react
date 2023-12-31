import { createContext, useEffect, useState } from "react";
import { User, AuthContextProps, AuthProviderProps } from '../types/auth';

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const useManageAuth = () => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const verifyUser = async () =>{
            try {
                const response = await fetch('/api/verify', {
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
        await fetch('/api/logout', {
            method: "POST",
            credentials: 'include'
        })
        setUser(null)

        //remove username from local storage
        localStorage.removeItem('username');
    };
    return { loading, authenticate, logout, user }
}


export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const manageAuth = useManageAuth()

    return (
        <AuthContext.Provider value={{manageAuth}}>
            {children}
        </AuthContext.Provider>
    )

}