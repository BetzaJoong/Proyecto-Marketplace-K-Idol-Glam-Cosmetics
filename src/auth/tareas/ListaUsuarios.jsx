import React from 'react';
import "./listau.css"; 

// Esto es un ejemplo
// Datos de usuario aquí
const usuarios = [
    { id: 1, correo: 'usuario1@example.com', nombre: 'Usuario 1' },
    { id: 2, correo: 'usuario2@example.com', nombre: 'Usuario 2' },
    // Agrega más usuarios si es necesario
];

function ListaUsuarios({ volver }) {
    const eliminarUsuario = (id) => {
        // Lógica para eliminar usuario
    };

    return (
        <div className="lista-usuarios">
            <h2>Lista de Usuarios</h2>
            <table>
                <thead>
                    <tr>
                        <th>Correo</th>
                        <th>Nombre</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, index) => (
                        <tr key={index}>
                            <td>{usuario.correo}</td>
                            <td>{usuario.nombre}</td>
                            <td><button onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={volver}>Regresar a la lista de tareas</button>
        </div>
    );
}

export default ListaUsuarios;
