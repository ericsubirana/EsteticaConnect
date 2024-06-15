import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { forgotPassowrd } from '../../api/auth.js'
import { useParams } from 'react-router-dom'

import logo from '../../assets/f.png'
import loginPhoto from '../../assets/loginPhoto.png'

import './login.css'
import 'react-toastify/dist/ReactToastify.css';


export default function LoginForm(props) {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, isAuthenticated, errorContext, setEmail, email, setOTP, changePassword, setChangePassword } = useAuth();
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
    if (changePassword) {
      toast.success('Password updated');
      toast.clearWaitingQueue();
      setChangePassword();
    }
  }, [changePassword]);

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
        <ToastContainer position="top-center" limit={1}/>
        <img src={logo} alt="logo" className='logoLogin' height={80} onClick={home} />
        <h4>Bienvenido/a de nuevo!</h4>
        <h1>Inicio de Sessión</h1>
        <form onSubmit={handleSubmit(async (values) => {
          signin(values);
        })}>
          <div className='userMail'>
            <div className='together'>
              <h3>CORREO ELECTRÓNICO</h3>
              {errors.email && <p>Email is required</p>}
            </div>
            <input type="text" {...register('email', { required: true })} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='userPassword'>
            <div className='together'>
              <h3>CONTRASEÑA</h3>
              {errors.password && <p>Password is required</p>}
            </div>
            <input type="password" {...register('password', { required: true })} />

          </div>
          <div className='buttonAndPAss'>
            <Link className='link' onClick={() => nagigateToOtp()} >Has olvidado la contraseña?</Link>
            <div className='centerButton'> <button type='submit' className='button-53' > Iniciar Sessión </button></div>
          </div>
          <p>Aún no estás registrado? <Link to="/register">Regístrate!</Link> </p>
        </form>
      </div>
      <div>
        <img className="flowers" src={loginPhoto} height={720} />
      </div>

    </div>
    
  )
}
