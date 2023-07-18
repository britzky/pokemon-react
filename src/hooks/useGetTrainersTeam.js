import { useState, useEffect } from 'react';


export const useGetTrainersTeam = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trainers, setTrainers] = useState([]);

    useEffect(() => {
        const fetchTrainers = async () => {
            try{
                const response = await fetch('/trainers', {
                    'Content-Type': 'application/json',
                    'credentials': 'include'
                })
                if (!response.ok){
                    throw new Error('HTTP Status ' + response.status);
                }
                const responseData = await response.json();
                setTrainers(responseData);
                setLoading(false);
            } catch(error) {
                setError(error);
                setLoading(false)
            }
        };
        fetchTrainers();
    }, []);

  return  { loading, error, trainers };
}
