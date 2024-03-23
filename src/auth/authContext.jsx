// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const [tipoUsuario, setTipoUsuario] = useState(null);

    const login = (userData, userType) => {
        setLoggedIn(true);
        setUsuario(userData);
        setTipoUsuario(userType);
    };

    const logout = () => {
        setLoggedIn(false);
        setUsuario(null);
        setTipoUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ loggedIn, usuario, tipoUsuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
