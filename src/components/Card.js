import { typeImages } from "../assets/images/types"

export const Card = ({ isImage, content, pokemonType, pokemonImage, pokemonName }) => {

    const background = typeImages[pokemonType]

  return (
    <section className="shadow-lg border p-2 border-gray-500 rounded-xl">
        {isImage ? 
            <div style={{ backgroundImage: `url(${background})`}} className="rounded-lg bg-cover bg-black/50 bg-gradient-to-b">
                <img src={pokemonImage} alt={pokemonName} className=" w-full" />
            </div>
            :
            <p>{content}</p> 
        }
    </section>
  )
}
