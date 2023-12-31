import { typeImages } from "../assets/images/types"

interface ImageCardProps {
  pokemonType?: string;
  pokemonImage?: string;
  pokemonName?: string;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
}

export const ImageCard: React.FC<ImageCardProps> = ({pokemonType, pokemonImage, pokemonName, onClick}) => {

    const background = typeImages[pokemonType as keyof typeof typeImages]
    const backgroundGradient = "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.4))"

  return (
    <section className="p-2">
        <div style={{ backgroundImage: `${backgroundGradient}, url(${background})`}} className="rounded-lg bg-cover">
            <img onClick={onClick} src={pokemonImage} alt={pokemonName} className="w-full" />
        </div>
    </section>
  )
}
