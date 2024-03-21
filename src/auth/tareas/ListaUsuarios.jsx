import React, { useState } from 'react';
import "./listau.css"; 

// Esto es un ejemplo
// Datos de usuario aquí
const usuarios = [
    { id: 1, correo: 'usuario1@example.com', nombre: 'Usuario 1' },
    { id: 2, correo: 'usuario2@example.com', nombre: 'Usuario 2' },
    // Agrega más usuarios si es necesario
];

function ListaUsuarios({ volver }) {
    const [listaUsuarios, setListaUsuarios] = useState(usuarios);

    const eliminarUsuario = (id) => {
        // Filtrar la lista de usuarios para obtener una nueva lista que excluya el usuario con el ID dado
        const nuevaListaUsuarios = listaUsuarios.filter(usuario => usuario.id !== id);
        // Actualizar el estado con la nueva lista de usuarios
        setListaUsuarios(nuevaListaUsuarios);
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
                    {listaUsuarios.map((usuario, index) => (
                        <tr key={index}>
                            <td>{usuario.correo}</td>
                            <td>{usuario.nombre}</td>
                            <td><button onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListaUsuarios;
