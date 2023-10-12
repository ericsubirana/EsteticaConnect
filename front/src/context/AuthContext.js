import { createContext, useState, useContext } from "react";
import {registerReq} from '../api/auth.js'

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth debe estar dentro del proveedor AuthContext');
    }
    return context;
}

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errorContext, setErrorContext] = useState([]);

    const signup = async (values) => {
        try {
            const user = await registerReq(values);
            setUser(user.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrorContext(error.response.data);
        }
    }

    return (
        <AuthContext.Provider value={{
            signup,
            user,
            isAuthenticated,
            errorContext
        }}>
            {children}
        </AuthContext.Provider>
    )
}

// un providder es un componente que envuelve a otros componentes
// y les da acceso a un contexto que se le pasa como prop y un contexto es un objeto que se puede compartir entre componentes

