import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext.js'
import { useNavigate, Link } from 'react-router-dom';
import { forgotPassowrd } from '../../api/auth.js'

import './otpinput.css'

function OTPInput() {

    const { email, otp } = useAuth();
    const navigation = useNavigate();

    const [timerCount, setTimer] =  useState(60);
    const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
    const [disable, setDisable] = useState(true);

    function resendOTP() {
        if (disable) return;
        forgotPassowrd({
                OTP: otp,
                recipient_email: email,
            })
            .then(() => setDisable(true))
            .then(() => alert("A new OTP has succesfully been sent to your email."))
            .then(() => setTimer(60))
            .catch(console.log);
    }

    function verfiyOTP() {
        if (parseInt(OTPinput.join("")) === otp) {
            navigation('/changePassword');
            return;
        }
        alert(
            "The code you have entered is not correct, try again or re-send the link"
        );
        return;
    }

    useEffect(() => {
        let interval = setInterval(() => {
            setTimer((lastTimerCount) => {
                lastTimerCount <= 1 && clearInterval(interval);
                if (lastTimerCount <= 1) setDisable(false);
                if (lastTimerCount <= 0) return lastTimerCount;
                return lastTimerCount - 1;
            });
        }, 1000); //each count lasts for a second
        //cleanup the interval on complete
        return () => clearInterval(interval);
    }, [disable]);

    return (
        <div className="otp">
        <div className="otp-background">
          <div className="otp-margins">
            <div className="otp-flex">
              <div className="otp-text">
                <p>Email Verification</p>
              </div>
              <div className="otp-p">
                <p>We have sent a code to your email {email}</p>
              </div>
            </div>
  
            <div>
              <form>
                <div className="otp-form">
                  <div className="form-back">
                    <div className="otp-input">
                      <input
                        maxLength="1"
                        className="otp-inputs"
                        type="text"
                        name=""
                        id=""
                        onChange={(e) =>
                          setOTPinput([
                            e.target.value,
                            OTPinput[1],
                            OTPinput[2],
                            OTPinput[3],
                          ])
                        }
                      ></input>
                    </div>
                    <div className="otp-input ">
                      <input
                        maxLength="1"
                        className="otp-inputs"
                        type="text"
                        name=""
                        id=""
                        onChange={(e) =>
                          setOTPinput([
                            OTPinput[0],
                            e.target.value,
                            OTPinput[2],
                            OTPinput[3],
                          ])
                        }
                      ></input>
                    </div>
                    <div className="otp-input">
                      <input
                        maxLength="1"
                        className="otp-inputs"
                        type="text"
                        name=""
                        id=""
                        onChange={(e) =>
                          setOTPinput([
                            OTPinput[0],
                            OTPinput[1],
                            e.target.value,
                            OTPinput[3],
                          ])
                        }
                      ></input>
                    </div>
                    <div className="otp-input">
                      <input
                        maxLength="1"
                        className="otp-inputs"
                        type="text"
                        name=""
                        id=""
                        onChange={(e) =>
                          setOTPinput([
                            OTPinput[0],
                            OTPinput[1],
                            OTPinput[2],
                            e.target.value,
                          ])
                        }
                      ></input>
                    </div>
                  </div>
  
                  <div className="verify-otp">
                    <div>
                      <a
                        onClick={() => verfiyOTP()}
                        className="verifyAccount"
                      >
                        Verify Account
                      </a>
                    </div>
  
                    <div className="resendCode">
                      <p>Didn't recieve code?</p>{" "}
                      <a
                        className="resendOTP"
                        style={{
                          color: disable ? "gray" : "blue",
                          cursor: disable ? "none" : "pointer",
                          textDecorationLine: disable ? "none" : "underline",
                        }}
                        onClick={() => resendOTP()}
                      >
                        {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}

export default OTPInput