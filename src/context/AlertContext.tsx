import { createContext, useState, useEffect } from 'react';
import { Alert, AlertContextProps, AlertProviderProps } from '../types/alert';

export const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider: React.FC<AlertProviderProps> = ({children}) => {

    const [alert, setAlert] = useState<Alert | null>(null);

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