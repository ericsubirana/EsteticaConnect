import React from 'react'
import { useForm } from 'react-hook-form'
import {registerReq} from '../api/auth.js'

function Register() {

  const { register, handleSubmit } = useForm()

  return (
    <div>
      <form onSubmit={handleSubmit (async (values) => {
        const user = await registerReq(values);//falta guardar el token en el local storage
      })}>
        <input type="text" {...register('username', {required:true})}/>
        <input type="email" {...register('email', {required:true})}/>
        <input type="password" {...register('password', {required:true})}/>
        <button type='submit'>
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default Register