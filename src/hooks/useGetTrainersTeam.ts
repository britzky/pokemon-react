import { useState, useEffect } from 'react';

export const useGetTrainersTeam = () => {
    const [loading, setLoading] = useState<Boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [trainers, setTrainers] = useState([]);

    useEffect(() => {
        const fetchTrainers = async () => {
            try{
                const response = await fetch('/api/trainers', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    'credentials': 'include'
                })
                if (!response.ok){
                    throw new Error('HTTP Status ' + response.status);
                }
                const responseData = await response.json();
                setTrainers(responseData);
                setLoading(false);
            } catch(error) {
                if (error instanceof Error){
                    setError(error.message);
                }
                setLoading(false)
            }
        };
        fetchTrainers();
    }, []);

  return  { loading, error, trainers };
}
