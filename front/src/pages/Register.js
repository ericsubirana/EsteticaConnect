import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {useAuth} from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

function Register() {

  const { register, handleSubmit, formState: {errors} } = useForm();
  const {signup, user, isAuthenticated, errorContext} = useAuth();	
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
        signup(values);
        console.log(user);
      })}>
        <input type="text" {...register('username', {required:true})}/>
        {errors.username && <p>Username is required</p>}
        <input type="email" {...register('email', {required:true})}/>
        {errors.email && <p>Email is required</p>}
        <input type="password" {...register('password', {required:true})}/>
        {errors.password && <p>Password is required</p>}
        <button type='submit'>
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default Register