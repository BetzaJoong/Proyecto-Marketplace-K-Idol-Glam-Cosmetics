import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/MakeupContext';
import { Link } from 'react-router-dom';
import './tareas.css';

function PerfilAdmin() {
    const navigate = useNavigate();
    const { logout } = useAppContext();

    const handleSalir = async () => {
        try {
            await logout();
            navigate('/iniciarsesion');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <div className="perfil-admin">
            <Link to="/lista-tareas">
                <button className="lista-tareas-button">Ir a mi lista de tareas</button>
            </Link>            
            <button className="salir-button" onClick={handleSalir}>Salir</button>
        </div>
    );
}

export default PerfilAdmin;


