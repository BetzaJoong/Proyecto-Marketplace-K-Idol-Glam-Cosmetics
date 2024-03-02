// import React, { useState } from 'react';

// export default function Perfil() {
//     const [nombre, setNombre] = useState('Usuario');
//     const [fotoPerfil, setFotoPerfil] = useState(null); // Puedes manejar la foto de perfil como una URL o un archivo

//     const handleEditarNombre = () => {
//         // Implementa la lógica para editar el nombre del usuario
//     };

//     const handleCambiarFotoPerfil = () => {
//         // Implementa la lógica para cambiar la foto de perfil del usuario
//     };

//     const handleVerFavoritos = () => {
//         // Implementa la lógica para mostrar los productos favoritos del usuario
//     };

//     const handleSalirCuenta = () => {
//         // Implementa la lógica para cerrar la sesión del usuario
//     };

//     return (
//         <div>
//             <h2>Perfil de Usuario</h2>
//             <div>
//                 <img src={fotoPerfil} alt="Foto de perfil" />
//                 <button onClick={handleCambiarFotoPerfil}>Cambiar Foto de Perfil</button>
//             </div>
//             <div>
//                 <label>Nombre:</label>
//                 <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
//                 <button onClick={handleEditarNombre}>Guardar Cambios</button>
//             </div>
//             <button onClick={handleVerFavoritos}>Ver Favoritos</button>
//             <button onClick={handleSalirCuenta}>Salir de la Cuenta</button>
//         </div>
//     );
// }


// PerfilUsuario.jsx
import React from 'react';
import { useAuth } from './authContext';

export function PerfilUsuario() {
    const { usuario, cambiarFotoPerfil, editarNombre, verFavoritos, logout } = useAuth();

    const handleCambiarFotoPerfil = () => {
        cambiarFotoPerfil();
    };

    const handleEditarNombre = () => {
        editarNombre();
    };

    const handleVerFavoritos = () => {
        verFavoritos();
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
            <button onClick={handleVerFavoritos}>Ver Favoritos</button>
            <button onClick={handleSalir}>Salir</button>
        </div>
    );
}

