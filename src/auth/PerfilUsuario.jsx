// // PerfilUsuario.jsx este me funciona super bien. 
// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from './authContext';
// import { AppContext } from '../context/MakeupContext';
// import './pusuario.css';

// export default function PerfilUsuario() {
//     const navigate = useNavigate();
//     const { usuario, cambiarFotoPerfil, editarNombre, logout } = useAuth();
//     const { favoritos } = useContext(AppContext); // Obtiene los favoritos del contexto

//     const handleVerFavoritos = () => {
//         navigate('/favoritos');
//     };

//     const handleSalir = async () => {
//         try {
//             await logout(); // Cerrar la sesión del usuario
//             navigate('/iniciarsesion'); // Redirigir a la página de inicio de sesión
//         } catch (error) {
//             console.error('Error al cerrar sesión:', error);
//         }
//     };

//     return (
//         <div className="perfil-usuario">
//             <h2>{usuario?.nombre}</h2>
//             <button onClick={handleVerFavoritos}>Ver Favoritos ({favoritos.size})</button>
//             <button onClick={handleSalir}>Salir</button>
//         </div>
//     );
// }



import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';
import { AppContext } from '../context/MakeupContext';
import './pusuario.css';

export default function PerfilUsuario() {
    const navigate = useNavigate();
    const { usuario, logout } = useAuth();
    const { favoritos } = useContext(AppContext);

    const handleVerFavoritos = () => {
        navigate('/favoritos');
    };

    const handleSalir = async () => {
        try {
            await logout();
            navigate('/iniciarsesion');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <div className="perfil-usuario">
            <h2>{usuario?.nombre}</h2>
            <button onClick={handleVerFavoritos}>Ver Favoritos ({favoritos.size})</button>
            <button onClick={handleSalir}>Salir</button>
        </div>
    );
}
