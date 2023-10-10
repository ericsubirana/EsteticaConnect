import React, { useState } from 'react'
import axios from 'axios';

export default function Login() {

  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  async function login () {
    const user = await axios.post('http://localhost:5000/api/login', {email, password});
    if(user){
      
    }
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
