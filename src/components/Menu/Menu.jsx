import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './menuStyles.css';
import { useAppContext } from '../../context/MakeupContext';

export default function Menu() {
    const [menuItems, setMenuItems] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isLoggedIn } = useAppContext(); // Estado que indica si el usuario ha iniciado sesión

    useEffect(() => {
        fetch('/makeup.json') // Cambiado a menu.json
            .then((response) => response.json())
            .then((data) => setMenuItems(data))
            .catch((error) => console.error('Error loading menu items:', error));
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

    if (isLoggedIn) {
        return (
            <div className="menu-container">
                <button onClick={toggleMenu} className="menu-title">Menú</button>
                <ul className={`menu-list ${isMenuOpen ? 'open' : ''}`}>
                    {menuItems.map((item) => (
                        <li key={item.id} className="menu-item">
                            <Link to={`/makeup/${item.id}`} className="menu-link" onClick={handleMenuItemClick}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    } 
    // else {
    //     return null; // Si el usuario no ha iniciado sesión, no renderizar el menú
    // }
}
