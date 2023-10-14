import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';


export default function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const {signin, isAuthenticated, errorContext, user} = useAuth();	

  const navigation = useNavigate();

  useEffect(() => {
    if(isAuthenticated){
      navigation('/home');
    }
  }, [isAuthenticated]);

  return (
    <div>
      { errorContext.map((error, index) => (
          <div key={index}>
            <p>{error}</p>
          </div>
      )) 
      }
       <form onSubmit={handleSubmit (async (values) => {
        signin(values);
      })}>
        <label>
          Email:
          <input type="text" {...register('email', { required: true })} />
          {errors.email && <p>Email is required</p>}
        </label>
        <label>
          Password:
          <input type="password" {...register('password', { required: true })} />
          {errors.password && <p>Password is required</p>}
        </label>
        <button type='submit' > Submit </button>
      </form>
      <p>Don't have an account? <Link to='/register'>Sign Up</Link></p>
      {console.log(user)}
    </div>
  )
}
