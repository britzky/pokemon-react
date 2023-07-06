import { typeImages } from "../assets/images/types"

export const ImageCard = ({pokemonType, pokemonImage, pokemonName}) => {

    const background = typeImages[pokemonType]
    const backgroundGradient = "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.4))"

  return (
    <section className="p-2">
        <div style={{ backgroundImage: `${backgroundGradient}, url(${background})`}} className="rounded-lg bg-cover">
            <img src={pokemonImage} alt={pokemonName} className="w-full" />
        </div>
    </section>
  )
}
