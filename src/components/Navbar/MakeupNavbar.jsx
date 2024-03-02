import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Dropdown } from 'react-bootstrap';
import makeupImage from '../../img/Logo.png';
import carroImage from '../../img/carrito-de-compras.png';
import { AppContext } from '../../context/MakeupContext';
import './navStyles.css';

export default function MakeupNavbar({ onCategoryChange }) {
    const { calculateTotalPrice, cart } = useContext(AppContext); // Obtén la función calculateTotalPrice y el carrito del contexto

    // Estado para almacenar las categorías del menú
    const [menuCategories, setMenuCategories] = useState([]);
    const [error, setError] = useState(null);

    // Función para formatear el precio con el signo de pesos "$"
    const formatPrice = (price) => {
        return `$${price.toLocaleString('es-CO', { minimumFractionDigits: 0 })}`;
    };

    // Cargar las categorías del menú al montar el componente
    useEffect(() => {
        fetch('/makeup.json')
            .then((response) => response.json())
            .then((data) => {
                const categories = data.reduce((acc, current) => {
                    if (!acc.includes(current.category)) {
                        acc.push(current.category);
                    }
                    return acc;
                }, []);
                setMenuCategories(categories);
            })
            .catch((error) => {
                console.error('Error loading menu categories:', error);
                setError(error);
            });
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="nav bg-info text-light fixed-top">
            <Container>
                <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="d-flex align-items-center">
                        <NavLink to="/" className="nav-link text-light text-link" style={{ fontSize: '24px' }}>
                            <img
                                src={makeupImage}
                                alt="Maquillaje"
                                style={{ width: '35px', height: '35px', marginRight: '10px' }}
                            />
                            K-Idol Glam Cosmetics
                        </NavLink>
                    </div>
                    <div className="d-flex align-items-center">
                        <Dropdown>
                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                Menú
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {menuCategories.map((category) => (
                                    <Dropdown.Item key={category}>
                                        <NavLink to={`/category/${category}`} className="nav-link text-dark" onClick={() => onCategoryChange(category)}>{category}</NavLink>
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="d-flex align-items-center">
                        <NavLink to="/carrito" className="nav-link text-light cart-link" style={{ fontSize: '30px' }}>
                            <img
                                src={carroImage}
                                alt="Carro"
                                style={{ width: '35px', height: '35px', marginBottom: '10px' }}
                            />
                            <span className="cart-text">
                                {/* Mostrar el precio total del carrito */}
                                {cart.length > 0 && formatPrice(calculateTotalPrice())}
                            </span>
                        </NavLink>
                    </div>
                </div>
            </Container>
        </div>
    );
}

