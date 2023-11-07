import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext.js'
import { useNavigate, Link } from 'react-router-dom';

import logo from '../../assets/f.png'
import registerPhoto from '../../assets/registerPhoto.jpg'
import './register.css'

function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup, user, isAuthenticated, errorContext } = useAuth();
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
        <div className='registerFormImage'>
            <div className='register'>
            {errorContext.map((error, index) => (
                <div key={index}>
                    <p>{error}</p>
                </div>
            ))
            }
            <img src={logo} alt="logo" height={80} onClick={home} />
            <h1>Registra't!</h1>
            <form onSubmit={handleSubmit(async (values) => {
                signup(values);
            })}>
                <div className='firstline'>
                    <div className='userName'>
                        <h3>NOM D'USUARI/A</h3>
                        <input type="text" {...register('username', { required: true })} />
                        {errors.username && <p>Username is required</p>}
                    </div>
                    <div>
                        <h3>CONTRSENYA</h3>
                        <input type="password" {...register('password', { required: true })} />
                        {errors.password && <p>Password is required</p>}
                    </div>
                </div>
                <div className='userMail'>
                    <h3>CORREU</h3>
                    <input type="email" {...register('email', { required: true })} />
                    {errors.email && <p>Email is required</p>}
                </div>
                <button type='submit' className='button-52'>
                    Sign Up
                </button>
            </form>
            <p>Ja tens un compte? <Link to='/login'>Inicia Sessió</Link></p>
        </div>
        <div className='imageRegister'>
            <img src={registerPhoto} alt='registerPhoto' height={650}/>
        </div>
        </div>
    )
}

export default RegisterForm