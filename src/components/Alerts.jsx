import { useContext } from "react";
import { AlertContext } from "../context/AlertContext";

export const Alerts = () => {
    const { alert } = useContext(AlertContext)

    switch(alert.status) {
        case 'success':
            return (
                <div className="p-4 mb-4 text-sm text-center text-green-800 rounded-lg bg-green-100 dark:bg-gray-600 dark:text-green-400" role="alert">
                    <span className="font-medium">{alert.message}</span>
                </div>
            )
        case 'danger':
            return (
                <div className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-100 dark:bg-gray-600 dark:text-red-400" role="alert">
                    <span className="font-medium">{alert.message}</span>
                </div>
            )
        case 'warning':
            return (
                <div className="p-4 mb-4 text-sm text-center text-yellow-800 rounded-lg bg-yellow-100 dark:bg-gray-600 dark:text-yellow-300" role="alert">
                    <span className="font-medium">{alert.message}</span>
                </div>
            )
        default:
            return null;
    }

}
