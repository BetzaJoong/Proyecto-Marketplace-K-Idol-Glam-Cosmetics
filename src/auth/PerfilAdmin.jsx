import React from 'react';
import { Link } from 'react-router-dom';
import "./tareas.css"; 

function PerfilAdmin() {
    const { logout } = useAuth();

    const handleSalir = () => {
        logout();
    };

    return (
        <div className="perfil-admin">
            <Link to="/lista-tareas">
                <button>Ir a mi lista de tareas</button>
            </Link>
            <button onClick={handleSalir}>Salir</button>
        </div>
    );
}

export default PerfilAdmin;


// import React from 'react';
// import { Redirect } from 'react-router-dom';
// import "./tareas.css"; 

// function PerfilAdmin() {
//     const usuario = JSON.parse(localStorage.getItem('usuario')); // Obtener el usuario del localStorage

//     if (usuario && usuario.rol === 'admin') {
//         return (
//             <div className="perfil-administrador">
//                 <p>Bienvenido, Administrador</p>
//                 <Link to="/lista-tareas">
//                     <button>Ir a mi lista de tareas</button>
//                 </Link>
//                 <button onClick={handleSalir}>Salir</button>
//             </div>
//         );
//     } else {
//         return <Redirect to="/iniciarsesion" />;
//     }
// }

// export default PerfilAdmin;




