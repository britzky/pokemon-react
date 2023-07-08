export const SignIn = () => {
  return (
    <main>
       <div className="min-h-screen flex flex-col items-center justify-center">
          <form>
            <div className="border-2 flex flex-col items-center gap-5 p-7 rounded-lg dark:border-gray-600 text-gray-700 dark:text-white">
              <h1 className="text-2xl py-4">Login Now!</h1>
              <label htmlFor="user_name">
              User Name:
              <input 
                type="text" 
              />
              </label>
              <label htmlFor="password">
                Password:
                <input 
                  type="password" 
                />
              </label>
              <button type="submit" className="flex items-center p-2 mr-2 text-lg font-medium text-gray-700 bg-white rounded-lg border border-gray-200 toggle-dark-state-example hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Login</button>
            </div>
          </form>
       </div>
    </main>
  )
}
