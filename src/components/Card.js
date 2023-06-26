
export const Card = ({ isImage, content, background, pokemonImage, pokemonName }) => {

  return (
    <section className="shadow-lg border border-gray-900 p-4 rounded-xl">
        {isImage ? 
            <div style={{ backgroundImage: `url(${background})`}} className="object-cover">
                <img src={pokemonImage} alt={pokemonName} />
            </div>
            :
            <p>{content}</p> 
        }
    </section>
  )
}
