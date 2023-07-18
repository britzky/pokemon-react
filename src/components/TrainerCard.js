import avatar from '../assets/images/bowlcut.png';

export const TrainerCard = ({trainer}) => {
  return (
    <div className="flex flex-col items-center border-2 rounded-lg shadow-lg shadow-black/80 p-5">
        <h4 key={trainer.id} className="font-bold">{trainer.username}</h4>
        <img src={avatar} alt={trainer.username} className="rounded-lg w-48" />
            <h6>Pokemon:</h6>
        <div className="grid grid-cols-2 gap-3">
            {trainer.pokemon.map((mon) => (
                <span key={mon.id}>{mon.name}</span>
            ))}
        </div>
    </div>
  )
}
