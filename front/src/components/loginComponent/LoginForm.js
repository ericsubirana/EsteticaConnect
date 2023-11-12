import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';

import logo from '../../assets/f.png'
import loginPhoto from '../../assets/loginPhoto.png'

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
      <div className='sqaure2'></div>
      <div className='formLogin'>
        {errorContext.map((error, index) => (
          <div key={index}>
            <p>{error}</p>
          </div>
        ))
        }

        <img src={logo} alt="logo" className='logoLogin' height={80} onClick={home} />
        <h4>Benvingut/da de nou!</h4>
        <h1>Inici de Sessió</h1>
        <form onSubmit={handleSubmit(async (values) => {
          signin(values);
        })}>
          <label className='userMail'>
            <div className='together'>
              <h3>CORREU</h3>
              {errors.email && <p>Email is required</p>}
            </div>
            <input type="text" {...register('email', { required: true })} />

          </label>
          <label className='userPassword'>
            <div className='together'>
              <h3>CONTRASENYA</h3>
              {errors.password && <p>Password is required</p>}
            </div>
            <input type="password" {...register('password', { required: true })} />

          </label>
          <div className='buttonAndPAss'>
            <Link className='link'>Has oblidat la contrasenya?</Link>
            <button type='submit' className='button-53' > Log In </button>
            {/*<AiOutlineArrowRight className='link2' />*/}
          </div>
          <p>Encara no estàs registrat? <Link to="/register">Registra't!</Link> </p>
        </form>
      </div>
      <div>
        <img className="flowers" src={loginPhoto} height={720} />
      </div>

    </div>
  )
}
