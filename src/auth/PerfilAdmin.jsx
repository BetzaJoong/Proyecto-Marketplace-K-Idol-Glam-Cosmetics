import React from 'react';
import { useAuth } from './authContext';
import { Link } from 'react-router-dom';
import "./tareas.css"; 

function PerfilAdmin() {
    const { logout } = useAuth();

    const handleSalir = () => {
        logout();
    };

    return (
        <div className="perfil-administrador">
            <Link to="/lista-tareas">
                <button>Ir a mi lista de tareas</button>
            </Link>
            <button onClick={handleSalir}>Salir</button>
        </div>
    );
}

export default PerfilAdmin;






