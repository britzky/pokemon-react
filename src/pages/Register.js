import { useForm } from 'react-hook-form';


export const Register = () => {

  const { register, handleSubmit} = useForm()
  return (
    <main>
        <div className="min-h-screen flex flex-col items-center justify-center gap-3">
          <form
            onSubmit={handleSubmit((data) => {
            console.log(data);
            })}
          >
              <input 
                type="text" 
                id="search-navbar" 
                name="search" 
                className="block w-1/2 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Search..." 
                autoComplete="off"
                {...register("firstName", {required: true})} 
              />
              <input 
                type="text" 
                id="search-navbar" 
                name="search" 
                className="block w-1/2 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Search..." 
                autoComplete="off"
                {...register("firstName", {required: true})} 
              />
              <input 
                type="text" 
                id="search-navbar" 
                name="search" 
                className="block w-1/2 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Search..." 
                autoComplete="off"
                {...register("firstName", {required: true})} 
              />
              <input 
                type="text" 
                id="search-navbar" 
                name="search" 
                className="block w-1/2 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Search..." 
                autoComplete="off"
                {...register("firstName", {required: true})} 
              />
              <input 
                type="text" 
                id="search-navbar" 
                name="search" 
                className="block w-1/2 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Search..." 
                autoComplete="off"
                {...register("firstName", {required: true})} 
              />
              <button type="submit">Register</button>
          </form>
        </div>
    </main>
  )
}
