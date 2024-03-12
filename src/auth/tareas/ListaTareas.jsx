import React from "react";
import { Link } from "react-router-dom";
import "./lista.css"; 

function ListaTareas() {
    return (
        <div className="lista-tareas">
            <h2>Lista de Tareas</h2>
            <ul>
                <li>
                    <Link to="/publicaciones" className="boton">Agregar Productos</Link>
                </li>
                <li>
                    <Link to="/mis-publicaciones" className="boton">Mis Publicaciones</Link>
                </li>
                <li>
                    <Link to="/usuarios" className="boton">Usuarios</Link>
                </li>
                <li>
                    <Link to="/atencion-cliente" className="boton">Atención al Cliente</Link>
                </li>
            </ul>
        </div>
    );
}

export default ListaTareas;


