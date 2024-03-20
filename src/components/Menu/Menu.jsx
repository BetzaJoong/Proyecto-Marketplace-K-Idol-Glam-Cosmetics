import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function Menu() {
    const [categories, setCategories] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        fetch('/makeup.json')
            .then((response) => response.json())
            .then((data) => setCategories(Object.keys(data.categories))) // Obtener las claves (categorías) del objeto
            .catch((error) => console.error('Error loading categories:', error));
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Función para manejar el clic en un enlace del menú
    const handleMenuItemClick = () => {
        closeMenu(); // Cerrar el menú cuando se hace clic en un enlace del menú
    };

    return (
        <div className="menu-container">
            <button onClick={toggleMenu} className="menu-title">Menú</button>
            <ul className={`menu-list ${isMenuOpen ? 'open' : ''}`}>
                {categories.map((category) => ( // Iterar sobre las categorías
                    <li key={category} className="menu-category">
                        <p className="category-title">{category}</p>
                        <Link to={`/category/${category}`} className="menu-link" onClick={handleMenuItemClick}>{category}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

