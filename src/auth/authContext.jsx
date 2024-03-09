// // authContext
// import React, { createContext, useState, useContext } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [loggedIn, setLoggedIn] = useState(false);
//     const [usuario, setUsuario] = useState(null);
//     const [tipoUsuario, setTipoUsuario] = useState(null);

//     const login = (userData, userType) => {
//         setLoggedIn(true);
//         setUsuario(userData);
//         setTipoUsuario(userType);
//     };

//     const logout = () => {
//         setLoggedIn(false);
//         setUsuario(null);
//         setTipoUsuario(null);
//     };

//     const cambiarFotoPerfil = () => {
//         if (tipoUsuario === 'usuario') {
//             // Lógica para cambiar la foto de perfil de un usuario
//             console.log("Cambiar foto de perfil del usuario");
//         } else if (tipoUsuario === 'administrador') {
//             // Lógica para cambiar la foto de perfil de un administrador
//             console.log("Cambiar foto de perfil del administrador");
//         }
//     };

//     const editarNombre = () => {
//         if (tipoUsuario === 'usuario') {
//             // Lógica para editar el nombre del usuario
//             console.log("Editar nombre del usuario");
//         } else if (tipoUsuario === 'administrador') {
//             // Lógica para editar el nombre del administrador
//             console.log("Editar nombre del administrador");
//         }
//     };

//     const verFavoritos = () => {
//         if (tipoUsuario === 'usuario') {
//             // Lógica para ver los favoritos del usuario
//             console.log("Ver favoritos del usuario");
//         } else {
//             console.log("Esta función no está disponible para los administradores");
//         }
//     };

//     const irListaTareas = () => {
//         if (tipoUsuario === 'administrador') {
//             // Lógica para ir a la lista de tareas del administrador
//             console.log("Ir a lista de tareas del administrador");
//         } else {
//             console.log("Esta función solo está disponible para los administradores");
//         }
//     };

//     return (
//         <AuthContext.Provider value={{ loggedIn, usuario, tipoUsuario, login, logout, cambiarFotoPerfil, editarNombre, verFavoritos, irListaTareas }}>
//             {children}
//         </AuthContext.Provider>
//     );
// }

// export const useAuth = () => useContext(AuthContext);






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
