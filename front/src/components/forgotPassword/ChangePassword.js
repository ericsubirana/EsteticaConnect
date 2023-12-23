import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../api/auth';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

import 'react-toastify/dist/ReactToastify.css';
import './changePassword.css'

function ChangePassword() {

  const {email, user, setChangePassword} = useAuth();
  const [password, setPassowrd] = useState();
  const [repeatPassword, setRepeatPassowrd] = useState();

  const navigation = useNavigate();

  const changeForgottenPassword = async () => {
    if(password.length > 5){
      if(password === repeatPassword){
        const changePass = await changePassword({ password, email });
        setChangePassword(password)
        navigation('/login');
      }
      else{
        toast.error('Passowrds do not match');
      }
    }
    else{
      toast.error('Passowrd must be at least 6 characters');
    }
  }

  return (
    <div>
      <section className="changePassword">
        <div className="marginsChange">
          <div className="changeBox">
            <h2 className="titlePassword">
              Change Password
            </h2>
            <form className="passwordForm">
              <div>
                <div
                  htmlFor="password"
                  className="labelPassword"
                >
                  New Password
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="inputPassword"
                  required={true}
                  onChange={(e) => setPassowrd(e.target.value)}
                ></input>
              </div>
              <div>
                <div
                  htmlFor="confirm-password"
                  className="labelPassword"
                >
                  Confirm password
                </div>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="inputPassword"
                  required={true}
                  onChange={(e) => setRepeatPassowrd(e.target.value)}
                ></input>
              </div>
              <div className="newletterPassword">
                <div className="newletterHeight">
                  <input
                    id="newsletter"
                    aria-describedby="newsletter"
                    type="checkbox"
                    className="newsletter"
                    required=""
                  ></input>
                </div>
                <div className="acceptance">
                  <div
                    htmlFor="newsletter"
                    className="acceptanceText"
                  >
                    I accept the{" "}
                    <a
                      className="acceptanceA"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </div>
                </div>
              </div>
            </form>
            <button
              onClick={() => changeForgottenPassword()}
              className="changePasswordButton"
            >
              Reset passwod
            </button>
          </div>
        </div>
      </section>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default ChangePassword