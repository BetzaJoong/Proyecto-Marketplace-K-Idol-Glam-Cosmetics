// // PerfilAdministrador.jsx
// import React from 'react';
// import { useAuth } from './authContext';

// export function PerfilAdministrador() {
//     const { usuario } = useAuth();

//     const handleCambiarFotoPerfil = () => {
//         // Lógica para cambiar la foto de perfil del administrador
//         console.log("Cambiar foto de perfil");
//     };

//     const handleEditarNombre = () => {
//         // Lógica para editar el nombre del administrador
//         console.log("Editar nombre");
//     };

//     const handleIrListaTareas = () => {
//         // Lógica para ir a la lista de tareas del administrador
//         console.log("Ir a la lista de tareas");
//     };

//     const handleSalir = () => {
//         // Lógica para salir de la cuenta
//         console.log("Salir de la cuenta");
//     };

//     return (
//         <div className="perfil-administrador">
//             <img src={usuario.fotoPerfil} alt="Foto de Perfil" />
//             <h2>{usuario.nombre}</h2>
//             <button onClick={handleCambiarFotoPerfil}>Cambiar Foto de Perfil</button>
//             <button onClick={handleEditarNombre}>Editar Nombre</button>
//             <button onClick={handleIrListaTareas}>Ir a mi lista de tareas</button>
//             <button onClick={handleSalir}>Salir</button>
//         </div>
//     );
// }


// PerfilAdministrador.jsx
import React from 'react';
import { useAuth } from './authContext';

export function PerfilAdministrador() {
    const { usuario, cambiarFotoPerfil, editarNombre, irListaTareas, logout } = useAuth();

    const handleCambiarFotoPerfil = () => {
        cambiarFotoPerfil();
    };

    const handleEditarNombre = () => {
        editarNombre();
    };

    const handleIrListaTareas = () => {
        irListaTareas();
    };

    const handleSalir = () => {
        logout();
    };

    return (
        <div className="perfil-administrador">
            <img src={usuario?.fotoPerfil} alt="Foto de Perfil" />
            <h2>{usuario?.nombre}</h2>
            <button onClick={handleCambiarFotoPerfil}>Cambiar Foto de Perfil</button>
            <button onClick={handleEditarNombre}>Editar Nombre</button>
            <button onClick={handleIrListaTareas}>Ir a mi lista de tareas</button>
            <button onClick={handleSalir}>Salir</button>
        </div>
    );
}
