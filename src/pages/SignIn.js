import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form'
import { AuthContext } from '../context/AuthContext'


export const SignIn = () => {
  const { register, handleSubmit, formState: {errors}} = useForm();
  const { auth } = useContext(AuthContext)
  const { authenticate, user} = auth
  const [message, setMessage] = useState(null)

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed to login');
  
      const responseData = await response.json();
      console.log(responseData)

      authenticate(responseData.token, responseData.user)

      setMessage(`Welcome back, ${responseData.user.first_name}!`);
      setTimeout(() => setMessage(null), 45000);
    } catch (error) {
      console.error('An error occured while trying to send data to the server', error)
      setMessage('Failed to login. Please check your username and password.')
      setTimeout(() => setMessage(null), 45000);
    }
  } 
  return (
    <main>
       <div className="min-h-screen flex flex-col items-center justify-center">
        {user && 
        <div>
          <p>{user.first_name}</p>
        </div>
        }
        {message && 
          <div>  
            <p>{message}</p>
          </div>
        }
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="border-2 flex flex-col items-center gap-5 p-7 rounded-lg dark:border-gray-600 text-gray-700 dark:text-white bg-white dark:bg-gray-900 shadow-lg shadow-gray-400 dark:shadow-black dark:shadow-xl">
              <h1 className="text-2xl py-4">Login Now!</h1>
              <label htmlFor="user_name">
              User Name:
              <input 
                type="text"
                {...register('user_name', {required: true})} 
              />
              </label>
              {errors.user_name && <p>This field is required</p>}
              <label htmlFor="password">
                Password:
                <input 
                  type="password"
                  {...register('password',{required: true})} 
                />
              </label>
              {errors.password && <p>This field is required</p>}
              <button type="submit" className="flex items-center p-2 mr-2 text-lg font-medium text-gray-700 bg-white rounded-lg border border-gray-200 toggle-dark-state-example hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Login</button>
            </div>
          </form>
       </div>
    </main>
  )
}
