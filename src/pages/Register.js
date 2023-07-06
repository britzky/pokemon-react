import { useForm } from 'react-hook-form';


export const Register = () => {

  const { register, handleSubmit} = useForm()
  return (
    <main>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <form
            onSubmit={handleSubmit((data) => {
            console.log(data);
            })}
          >
            <div className="flex flex-col items-center gap-3 border-2 rounded-xl p-4">
              <h1>Register Now</h1>
              <div className=" flex gap-7">
                <div>
                  <label htmlFor="first name">First Name:</label>
                  <input 
                    type="text" 
                    id="search-navbar" 
                    name="search" 
                    className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Search..." 
                    autoComplete="off"
                    {...register("firstName", {required: true})} 
                  />
                </div>
                <div>
                  <label htmlFor="last name">Last Name:</label>
                  <input 
                    type="text" 
                    id="search-navbar" 
                    name="search" 
                    className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Search..." 
                    autoComplete="off"
                    {...register("firstName", {required: true})} 
                  />
                </div>
              </div>
              
              <input 
                type="text" 
                id="search-navbar" 
                name="search" 
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Search..." 
                autoComplete="off"
                {...register("firstName", {required: true})} 
              />
              <input 
                type="text" 
                id="search-navbar" 
                name="search" 
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Search..." 
                autoComplete="off"
                {...register("firstName", {required: true})} 
              />
              <input 
                type="text" 
                id="search-navbar" 
                name="search" 
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Search..." 
                autoComplete="off"
                {...register("firstName", {required: true})} 
              />
              <button type="submit">Register</button>

            </div>
          </form>
        </div>
    </main>
  )
}
