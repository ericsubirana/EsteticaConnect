import React from 'react'
import { useAuth } from './context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute() {

    const {user, isAuthenticated, loading} = useAuth();

    if(loading) return <h1>Loading...</h1>

    console.log(user.admin)

    if(!loading && !isAuthenticated || !loading && !user.admin) { //si s'ha carregat la pàgina i el user no es admin redirigim cap el login
        return <Navigate to='/login' replace/>
    }

    return <Outlet /> 
}

export default ProtectedRoute