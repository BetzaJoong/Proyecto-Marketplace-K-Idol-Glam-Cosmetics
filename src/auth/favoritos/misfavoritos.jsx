// MisFavoritos
import React, { useContext } from 'react';
import { AppContext } from '../../context/MakeupContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './fav.css';

export default function Favoritos() {
    const { favoritos, eliminarFavorito } = useContext(AppContext);

    return (
        <div className="favoritos-container">
            <h1>Mis Favoritos</h1>
            {favoritos.size > 0 ? (
                Array.from(favoritos).map((producto, index) => (
                    <div key={index} className="producto-card">
                        <img src={producto.img} alt={producto.name} className="producto-img" />
                        <div className="producto-info">
                            <h2 className="producto-nombre">{producto.name}</h2>
                            <p className="producto-descripcion">{producto.desc}</p>
                        </div>
                        <div className="acciones">
                            <FontAwesomeIcon
                                icon={faHeart}
                                color='red'
                                className="icono-corazon"
                                onClick={() => eliminarFavorito(producto)}
                            />
                        </div>
                    </div>
                ))
            ) : (
                <p className="empty-message">No tienes productos marcados como favoritos. Revisa en el menú y dale 💖.</p>
            )}
        </div>
    );
}
