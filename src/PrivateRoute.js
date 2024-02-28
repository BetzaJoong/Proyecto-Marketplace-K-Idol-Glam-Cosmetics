import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './auth/authContext'; // Importa el hook useAuth

const PrivateRoute = ({ element, ...props }) => {
    const { loggedIn } = useAuth();

    return loggedIn ? <Route {...props} element={element} /> : <Navigate to="/iniciar-sesion" />;
};

export default PrivateRoute;
