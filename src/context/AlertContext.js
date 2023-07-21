import { createContext, useState, useEffect } from 'react';

export const AlertContext = createContext();

export const AlertProvider = ({children}) => {

    const [alert, setAlert] = useState({message: '', status: ''});

    useEffect(() => {
        const storedAlert = localStorage.getItem('alert');
        console.log("Alert from storage: ", storedAlert);
        if(storedAlert) {
            setAlert(JSON.parse(storedAlert));
            localStorage.removeItem('alert');
            setTimeout(() => setAlert(null), 3000)
        }
    }, [])

    useEffect(() => {
        const timeoutId = setTimeout(() => setAlert(null), 3000);
        return () => clearTimeout(timeoutId);
    },[alert])

    return(
        <AlertContext.Provider value={{alert, setAlert}}>
            {children}
        </AlertContext.Provider>
    )
}