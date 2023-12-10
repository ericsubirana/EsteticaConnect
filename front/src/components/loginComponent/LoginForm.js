import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { forgotPassowrd } from '../../api/auth.js'

import logo from '../../assets/f.png'
import loginPhoto from '../../assets/loginPhoto.png'

import './login.css'
import 'react-toastify/dist/ReactToastify.css';


export default function LoginForm() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, isAuthenticated, errorContext, setEmail, email, setOTP } = useAuth();
  const navigation = useNavigate();
  
  function nagigateToOtp() {
    if (email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      setOTP(OTP);
      forgotPassowrd({OTP, recipient_email: email})
        .then(() => navigation("/otp"))
        .catch(console.log);
      return;
    }
    return alert("Please enter your email");
  }

  const notify = (error) => {
    toast.error(error);
  }

  useEffect(() => {
    let timeoutId;
  
    errorContext.forEach((error, index) => {
      timeoutId = setTimeout(() => {
        notify(error);
      }, 0);
    });
  
    return () => clearTimeout(timeoutId);
  }, [errorContext]);

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
        <div className='error-showup'>
        </div>
        <ToastContainer position="top-center" />
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
            <input type="text" {...register('email', { required: true })} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className='userPassword'>
            <div className='together'>
              <h3>CONTRASENYA</h3>
              {errors.password && <p>Password is required</p>}
            </div>
            <input type="password" {...register('password', { required: true })} />

          </label>
          <div className='buttonAndPAss'>
            <Link className='link' onClick={() => nagigateToOtp()} >Has oblidat la contrasenya?</Link>
            <button type='submit' className='button-53' > Log In </button>
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
