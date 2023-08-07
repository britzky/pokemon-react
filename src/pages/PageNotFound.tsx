import error from '../assets/images/pagenotfound.png'

export const PageNotFound = () => {
  return (
    <main>
      <div className="flex flex-col items-center dark:text-white text-4xl py-7">
        <h5>Ooops....</h5>
        <img className="max-w-xl rounded-md" src={error} alt="error image" />
        <h3>There was an error!</h3>
      </div>
    </main>
  )
}
