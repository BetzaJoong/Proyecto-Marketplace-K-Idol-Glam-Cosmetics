// // authContext.js
// import React, { createContext, useState, useContext } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [loggedIn, setLoggedIn] = useState(false);

//     return (
//         <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
//             {children}
//         </AuthContext.Provider>
//     );
// }

// export const useAuth = () => useContext(AuthContext);


// authContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [usuario, setUsuario] = useState(null);

    const login = (userData) => {
        setLoggedIn(true);
        setUsuario(userData);
    };

    const logout = () => {
        setLoggedIn(false);
        setUsuario(null);
    };

    const cambiarFotoPerfil = () => {
        // Lógica para cambiar la foto de perfil
        console.log("Cambiar foto de perfil");
    };

    const editarNombre = () => {
        // Lógica para editar el nombre del usuario
        console.log("Editar nombre");
    };

    const verFavoritos = () => {
        // Lógica para ver los favoritos del usuario
        console.log("Ver favoritos");
    };

    const irListaTareas = () => {
        // Lógica para ir a la lista de tareas del administrador
        console.log("Ir a lista de tareas");
    };

    return (
        <AuthContext.Provider value={{ loggedIn, usuario, login, logout, cambiarFotoPerfil, editarNombre, verFavoritos, irListaTareas }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
