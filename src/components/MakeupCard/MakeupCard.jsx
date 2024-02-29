import React, { useContext } from 'react';
import { AppContext } from '../../context/MakeupContext';
import { NavLink } from 'react-router-dom';
import './makeupCardStyle.css';


export default function MakeupCard({ makeup }) {
    const { cart, setCart, calculateTotalPrice } = useContext(AppContext);

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const formattedPrice = makeup.price.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    const addToCart = () => {
        const existingMakeup = cart.find((item) => item.id === makeup.id);

        if (existingMakeup) {
            existingMakeup.quantity += 1;
            setCart([...cart]);
        } else {
            const newMakeup = { ...makeup, quantity: 1 };
            setCart([...cart, newMakeup]);
        }

        calculateTotalPrice();
    };

    const handleVerMasClick = () => {
        // Navegar a MakeupDetail y luego desplazar hacia arriba
        window.scrollTo(0, 0);
    };


    return (
            <div className="makeup-card">
                <img className="makeup-image" src={makeup.img} alt={makeup.name} />
                <h2 className="makeup-name">{capitalizeFirstLetter(makeup.name)}</h2>
                <div className="makeup-ingredients">
                    <p>Ingredientes: </p>
                    <ul>
                        {makeup.ingredients.map((ingredient, index) => (
                            <li key={index}>{capitalizeFirstLetter(ingredient)}</li>
                        ))}
                    </ul>
                </div>
                <p className="makeup-price">{formattedPrice}</p>
                <div className="button-container">
                    <NavLink to={`/makeup/${makeup.id}`} className="btn btn-info" onClick={handleVerMasClick}>
                        👀 Ver más
                    </NavLink>
                    <button className="btn btn-danger" onClick={addToCart}>
                        Añadir 🛒
                    </button>
                </div>
            </div>
    );
}




