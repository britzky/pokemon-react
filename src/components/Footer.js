import { Link } from "react-router-dom"

export const Footer = () => {
  return (
    <footer className="bg-white shadow border-t-2 dark:border-t-1 dark:border-gray-900 dark:bg-gray-900">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link to="/" className="hover:underline">Pokemon</Link></span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
                <a href="https://johnclapperportfolio.netlify.app" target="_blank" rel="noreferrer" className="mr-4 hover:underline md:mr-6 ">My Portfolio</a>
            </li>
            <li>
                <a href="https://github.com/britzky" target="_blank" rel="noreferrer" className="mr-4 hover:underline md:mr-6">Github</a>
            </li>
            <li>
                <a href="https://www.linkedin.com/in/john-clapper-476069192/" target="_blank" rel="noreferrer" className="mr-4 hover:underline md:mr-6">LinkedIn</a>
            </li>
            <li>
                <a href="mailto:johnclapper89@gmail.com" className="hover:underline">Contact</a>
            </li>
        </ul>
        </div>
    </footer>   
  )
}
