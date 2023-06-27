import { typeImages } from "../assets/images/types"
import { Button } from "../components"

export const Card = ({ isImage, isButton, content, pokemonType, pokemonImage, pokemonName }) => {

    const background = typeImages[pokemonType]

  return (
    <section className="p-2">
        {isImage ? (
            <div style={{ backgroundImage: `url(${background})`}} className="rounded-lg bg-cover bg-black/50 bg-gradient-to-b">
                <img src={pokemonImage} alt={pokemonName} className="w-full" />
            </div>
        ) : (
            <p>{content}</p> 
        )
    }
    </section>
  )
}
