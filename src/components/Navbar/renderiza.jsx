import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import MakeupNavbar from './MakeupNavbar';
import { AppContext } from '../../context/MakeupContext';

export default function AuthenticatedLayout({ children }) {
    const { loggedIn } = useContext(AppContext);

    // Renderiza el Navbar solo si el usuario está autenticado
    const renderNavbar = () => {
        return loggedIn ? <MakeupNavbar /> : null;
    };

    // Redirige al usuario a la página de inicio de sesión si no está autenticado
    if (!loggedIn) {
        return <Navigate to="/iniciarsesion" />;
    }

    return (
        <div>
            {renderNavbar()}
            {children}
        </div>
    );
}
