import { useForm } from 'react-hook-form';


export const Register = () => {

  const { 
    register, 
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async ({confirmPassword, ...data}) => {
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to register');

      const responseData = await response.json();
      console.log(responseData)
    } catch (error) {
      console.error('An error occurred while trying to send data to the server', error);
    }
  };

  const password = watch("password", "");

  return (
    <main>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center gap-3 border-2 rounded-xl p-4 bg-white shadow-lg shadow-gray-400 dark:bg-gray-900 dark:border-gray-600 dark:text-white dark:shadow-lg dark:shadow-black ">
              <h1 className="text-2xl">Register Now</h1>
              <div className=" flex gap-7">
                  <label htmlFor="first name">
                    First Name:
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName" 
                      placeholder="Santa" 
                      autoComplete="off"
                      {...register("first_name", {required: true})} 
                    />
                  </label>
                  <label htmlFor="last name">
                    Last Name:
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName" 
                      placeholder="Claus" 
                      autoComplete="off"
                      {...register("last_name", {required: true})} 
                    />
                  </label>
              </div>
                <label className="w-full" htmlFor="user name">
                  User Name:
                  <input 
                    type="text" 
                    id="userName" 
                    name="userName" 
                    placeholder="CookieLuver" 
                    autoComplete="off"
                    {...register("user_name", {required: true})} 
                  />
        
                </label>
                <label className="w-full" htmlFor="email">
                  Email:
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="example@gmail.com" 
                    autoComplete="off"
                    {...register("email", {required: true})} 
                  />
                </label>
              <label className="w-full" htmlFor="password">
                Password:
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  autoComplete="off"
                  {...register("password", {required: true, minLength: 8})} 
                />
              </label>
              {errors.password && <p>Password needs to be at least 8 characters long</p>}
              <label className="w-full" htmlFor="confirmPassword">
                Confirm Password:
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  autoComplete="off"
                  {...register("confirmPassword", {required: true, validate: value => value === password || "The passwords do not match"})} 
                />
              </label>
              {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
              <button type="submit" className="flex items-center p-2 mr-2 text-lg font-medium text-gray-700 bg-white rounded-lg border border-gray-200 toggle-dark-state-example hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Register</button>
            </div>
          </form>
        </div>
    </main>
  )
}
