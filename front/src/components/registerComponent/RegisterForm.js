import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext.js'
import { useNavigate, Link } from 'react-router-dom';

import logo from '../../assets/f.png'
import registerPhoto from '../../assets/registerPhoto.png'
import './register.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup, user, isAuthenticated, errorContext } = useAuth();
    const navigation = useNavigate();

    useEffect(() => {
        let timeoutId;

        errorContext.forEach((error, index) => {
            timeoutId = setTimeout(() => {
                notify(error);
            }, 0);
        });

        return () => clearTimeout(timeoutId);
    }, [errorContext]);

    const notify = (error) => {
        toast.error(error);
    }

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
            <div className='sqaure'></div>
            <ToastContainer position='top-center' />
            <div className='register'>
                <img className="imgForm" src={logo} alt="logoLogin" height={80} onClick={home} />
                <h1>Regístrate!</h1>
                <form onSubmit={handleSubmit(async (values) => {
                    signup(values);
                })}>
                    <div className='firstline'>
                        <div className='userName'>
                            <div>
                                <h3>NOMBRE USUARIO/A</h3>
                                {errors.username && <p>Username is required</p>}
                            </div>
                            <input type="text" {...register('username', { required: true })} />

                        </div>
                        <div>
                            <div>
                                <h3>CONTRASEÑA</h3>
                                {errors.password && <p>Password is required</p>}
                            </div>
                            <input type="password" {...register('password', { required: true })} />

                        </div>
                    </div>
                    <div className='userMailRegister'>
                        <div className='mailError'>
                            <h3>CORREO ELECTRÓNICO</h3>
                            {errors.email && <p>Email is required</p>}
                        </div>
                        <input type="email" {...register('email', { required: true })} />

                    </div>
                    <div className='registerButton'>
                    <button type='submit' className='button-52'>
                        Registrarse
                    </button>
                    </div>
                </form>
                <p className='alreadyHasAccount'>Ya tienes una cuenta? <Link to='/login'>Inicia Sessión</Link></p>
            </div>
            <div className='imageRegister'>
                <img src={registerPhoto} alt='registerPhoto' height={500} />
            </div>
        </div>
    )
}

export default RegisterForm