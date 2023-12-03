import React from 'react'
import { useAuth } from './context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute() {

    const {user, isAuthenticated, loading} = useAuth();

    if(loading) return <h1>Loading...</h1>

    if(!loading && !isAuthenticated) {
        return <Navigate to='/login' replace/>
    }

    return <Outlet /> //outlet ens porta cap a la ruta que en un principi voliem anar pero que em interceptat aqui
}

export default ProtectedRoute