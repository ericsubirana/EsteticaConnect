import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

import logo from '../../assets/f.png'
import loginPhoto from '../../assets/loginPhoto.jpg'
import './login.css'

export default function LoginForm() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, isAuthenticated, errorContext, user } = useAuth();

  const navigation = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigation('/home');
    }
  }, [isAuthenticated]);

  const home = () => {
    navigation('/home');
  }

  return (
    <div className='login'>
      <div>
        {errorContext.map((error, index) => (
          <div key={index}>
            <p>{error}</p>
          </div>
        ))
        }
        <div className='square'></div>
        <img src={logo} alt="logo" height={80} onClick={home} />
        <h4>Benvingut/da de nou!</h4>
        <h1>Inici de Sessió</h1>
        <form onSubmit={handleSubmit(async (values) => {
          signin(values);
        })}>
          <label>
            <h3>CORREU</h3>
            <input type="text" {...register('email', { required: true })} />
            {errors.email && <p>Email is required</p>}
          </label>
          <label>
            <h3>CONTRASENYA</h3>
            <input type="password" {...register('password', { required: true })} />
            {errors.password && <p>Password is required</p>}
          </label>
          <p>Has oblidat la contrasenya?</p>
          <p>Encara no estàs registrat? <Link to="/register">Registra't!</Link> </p>

          <button type='submit' > Submit </button>
        </form>
      </div>
      <div>
        <img src={loginPhoto} alt="" />
      </div>
    </div>
  )
}
