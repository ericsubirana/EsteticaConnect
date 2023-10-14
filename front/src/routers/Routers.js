import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {AuthProvider} from '../context/AuthContext.js';
import ProtectedRoute from '../ProtectedRoute.js';

import Home from '../pages/Home.js';
import Login from '../pages/Login.js';
import Register from '../pages/Register.js';
import Calendar from '../pages/Calendar.js';
import Serveis from '../pages/Serveis.js';
import Productes from '../pages/Productes.js';
import Profile from '../pages/Profile.js';
import Horaris from '../pages/Horaris.js';
import Cart from '../pages/Cart.js';

function Routers() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
            <Route path="*" element={<Home/>} />
            <Route path="/home" element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/serveis' element={<Serveis/>} />
            <Route path='/productes' element={<Productes/>} />
            <Route path='/horaris' element={<Horaris/>} />

            <Route element={<ProtectedRoute/>}>
              <Route path='/profile' element={<Profile/>} />
              <Route path='/cart' element={<Cart/>} />
            </Route>

            <Route path='/calendar' element={<Calendar/>} />  
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default Routers