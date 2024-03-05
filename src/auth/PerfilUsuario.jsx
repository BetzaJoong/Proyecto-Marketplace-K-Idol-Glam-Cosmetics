// PerfilUsuario.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';
import { AppContext } from '../context/MakeupContext';
import './pusuario.css';

export default function PerfilUsuario() {
    const navigate = useNavigate();
    const { usuario, cambiarFotoPerfil, editarNombre, logout } = useAuth();
    const { favoritos } = useContext(AppContext); // Obtiene los favoritos del contexto

    const handleCambiarFotoPerfil = () => {
        cambiarFotoPerfil();
    };

    const handleEditarNombre = () => {
        editarNombre();
    };

    const handleVerFavoritos = () => {
        navigate('/favoritos');
    };

    const handleSalir = () => {
        logout();
    };

    return (
        <div className="perfil-usuario">
            <img src={usuario?.fotoPerfil} alt="Foto de Perfil" />
            <h2>{usuario?.nombre}</h2>
            <button onClick={handleCambiarFotoPerfil}>Cambiar Foto de Perfil</button>
            <button onClick={handleEditarNombre}>Editar Nombre</button>
            <button onClick={handleVerFavoritos}>Ver Favoritos ({favoritos.size})</button>
            <button onClick={handleSalir}>Salir</button>
        </div>
    );
}
