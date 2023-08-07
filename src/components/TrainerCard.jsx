import { useNavigate } from 'react-router-dom';
import { Button } from '.';

import avatar from '../assets/images/bowlcut.png';
import fight from '../assets/icons/fight.png';

export const TrainerCard = ({trainer}) => {
    const navigate = useNavigate();

    const handleFight = () => {
        const selectedTrainerInfo = {
            name: trainer.username, 
            pokemon: trainer.pokemon,
        };
        navigate('/fight', { state: { selectedTrainer: selectedTrainerInfo}});
    }
  return (
    <div className="flex flex-col items-center border-2 rounded-lg shadow-lg shadow-black/80 px-10 py-5">
        <h4 key={trainer.id} className="font-bold text-3xl">{trainer.username}</h4>
        <img src={avatar} alt={trainer.username} className="rounded-lg w-48" />
            <h6 className="font-bold text-2xl">Team:</h6>
        <div className="grid grid-cols-2 gap-3 pb-3">
            {trainer.pokemon.map((mon) => (
                <span key={mon.id}>{mon.name}</span>
            ))}
        </div>
            <Button image={fight} imageName='fight' onClick={handleFight}>
                Fight
            </Button>
    </div>
  )
}
