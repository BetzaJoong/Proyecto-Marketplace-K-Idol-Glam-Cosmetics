// Publicaciones.jsx
import React from 'react';
import makeupData from '../../../public/makeup.json';
import "./mp.css"; 

function Publicaciones({ volver }) {
    return (
        <div className="publicaciones">
            <h2>Mis Publicaciones</h2>
            <div className="publicaciones-grid">
                {makeupData.map((publicacion) => (
                    <div key={publicacion.id} className="publicacion">
                        <img src={publicacion.img} alt={publicacion.name} />
                        <h3>{publicacion.name}</h3>
                        <p>Precio: {publicacion.price}</p>
                        {/* Agrega más detalles de la publicación si lo deseas */}
                        <button onClick={() => editarPublicacion(publicacion.id)}>Editar</button>
                    </div>
                ))}
            </div>
            <button onClick={volver}>Regresar a la lista de tareas</button>
        </div>
    );
}

export default Publicaciones;



