import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/MakeupContext";
import './makeupStyle.css';

export default function MakeupDetail() {
    const { id } = useParams();
    const context = useContext(AppContext);
    const { makeup, cart, setCart, calculateTotalPrice } = context;

    const selectedMakeup = makeup.find((item) => item.id === id);

    if (!selectedMakeup) {
        return <div>Producto no encontrado.</div>;
    }

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const formattedPrice = selectedMakeup.price.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    const addToCart = () => {
        const makeupIndex = cart.findIndex((item) => item.id === selectedMakeup.id);

        if (makeupIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[makeupIndex].quantity += 1;
            setCart(updatedCart);
        } else {
            const newCart = [...cart, { ...selectedMakeup, quantity: 1 }];
            setCart(newCart);
        }
        calculateTotalPrice();
    };

    return (
        <div className="makeup-detail-card">
            <img className="makeup-detail-image" src={selectedMakeup.img} alt={selectedMakeup.name} />
            <div className="makeup-detail-info">
                <h5 className="makeup-detail-title">{capitalizeFirstLetter(selectedMakeup.name)}</h5>
                <p className="makeup-detail-desc">{capitalizeFirstLetter(selectedMakeup.desc)}</p>
                <p className="makeup-detail-ingredients">
                    <strong>Ingredientes:</strong>
                </p>
                <ul className="makeup-detail-ingredients">
                    {selectedMakeup.ingredients.map((ingredient, index) => (
                        <li key={index}>
                            💄 {capitalizeFirstLetter(ingredient)}
                        </li>
                    ))}
                </ul>
                <p className="makeup-detail-price">
                    <strong>Precio:</strong> {formattedPrice}
                </p>
                <div className="makeup-detail-button">
                    <button className="makeup-detail-add-to-cart" onClick={addToCart}>
                        Añadir 🛒
                    </button>
                </div>
            </div>
        </div>
    );
}
