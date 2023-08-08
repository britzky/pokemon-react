import { useContext } from "react";
import { AlertContext } from "../context/AlertContext";

export const Alerts = () => {
    const context = useContext(AlertContext);
    if (!context || !context.alert){
        return null;
    }
    const { status, message } = context.alert

    let classes = "pb-4 mb-4 text-sm text-center rounded-lg"
    let color = ""
    

    switch(status) {
        case 'success':
            color = "text-green-800 rounded-lg bg-green-100 dark:bg-gray-600 dark:text-green-400";
            break; 
        case 'danger':
            color = "text-red-800 rounded-lg bg-red-100 dark:bg-gray-600 dark:text-red-400";
            break; 
        case 'warning':
            color = "text-yellow-800 rounded-lg bg-yellow-100 dark:bg-gray-600 dark:text-yellow-300"
            break;
        default:
            return null;
    }

    return (
        <div className={classes + " " + color} role="alert">
            <span className="font-medium">{message}</span>
        </div>
    )
}
