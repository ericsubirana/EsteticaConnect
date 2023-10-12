import React, { useState } from 'react'
import { loginReq } from '../api/auth';


export default function Login() {

  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  async function login () {
    const user = await loginReq({email,password});
    console.log(user);
  }

  return (
    <div>
        <label>
          Email:
          <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="text" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button onClick={login}> Submit </button>
    </div>
  )}
