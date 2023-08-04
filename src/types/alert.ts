export interface Alert {
    message: string;
    status: string;
}

export interface AlertContextProps {
    alert: Alert | null;
    setAlert: React.Dispatch<React.SetStateAction<Alert | null>>
}

export interface AlertProviderProps {
    children: React.ReactNode;
}