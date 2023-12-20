import { createContext, useState, useContext, useEffect } from "react";
import { registerReq, loginReq, verifyTokenReq, logoutReq } from '../api/auth.js'
import Cookies from 'js-cookie';


export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe estar dentro del proveedor AuthContext');
    }
    return context;
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errorContext, setErrorContext] = useState([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState();
    const [otp, setOTP] = useState();
    const [changePassword, setChangePassword] = useState();


    const signup = async (values) => {
        try {
            const user = await registerReq(values);
            setUser(user.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrorContext(error.response.data);
        }
    }

    const signin = async (values) => {
        try {
            const user = await loginReq(values);
            setUser(user.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrorContext(error.response.data);
        }
    }

    const logout = async () => {
        try {
            await logoutReq();
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            setErrorContext(error.response.data);
        }
    }

    useEffect(() => {
        if (errorContext.length > 0) {
            const timer = setTimeout(() => {
                setErrorContext([]);
            }, 3000)
            return () => clearTimeout(timer);
        }
    }, [errorContext])

    useEffect(() => {

        async function checkLogin() {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const res = await verifyTokenReq(cookies.token);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }
                
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                setUser(null)
                setLoading(false);
            }
            
        }
        checkLogin();
    }, []);

    const updateUser = async () => {
        try {
            const cookies = Cookies.get();
            const res = await verifyTokenReq(cookies.token);
            if (!res.data) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }
            
            setIsAuthenticated(true);
            setUser(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setIsAuthenticated(false);
            setUser(null)
            setLoading(false);
        }
    }   

    return (
        <AuthContext.Provider value={{
            signup,
            user,
            isAuthenticated,
            errorContext,
            signin,
            loading,
            logout,
            email,
            setEmail,
            otp,
            setOTP,
            changePassword, 
            setChangePassword,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

// un providder es un componente que envuelve a otros componentes
// y les da acceso a un contexto que se le pasa como prop y un contexto es un objeto que se puede compartir entre componentes

