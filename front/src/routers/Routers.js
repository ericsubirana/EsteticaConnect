import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../pages/Home.js';
import Login from '../pages/Login.js';
import Register from '../pages/Register.js';
import Calendar from '../pages/Calendar.js';
import Serveis from '../pages/Serveis.js';
import Productes from '../pages/Productes.js';
import Profile from '../pages/Profile.js';
import Horaris from '../pages/Horaris.js';

function Routers() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="*" element={<Home/>} />
            <Route path="/home" element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/calendar' element={<Calendar/>} />  
            <Route path='/serveis' element={<Serveis/>} />
            <Route path='/productes' element={<Productes/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/horaris' element={<Horaris/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default Routers