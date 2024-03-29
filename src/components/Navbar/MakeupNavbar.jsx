import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Dropdown } from 'react-bootstrap';
import makeupImage from '../../img/Logo.png';
import carroImage from '../../img/carrito-de-compras.png';
import perfilDefaultImage from '../../img/glitter.webp';
import { AppContext } from '../../context/MakeupContext';
import './navStyles.css';

export default function MakeupNavbar({ onCategoryChange, perfilImage }) {
    const { calculateTotalPrice, cart } = useContext(AppContext);
    const [menuCategories, setMenuCategories] = useState([]);
    const [error, setError] = useState(null);

    const formatPrice = (price) => {
        return `$${price.toLocaleString('es-CO', { minimumFractionDigits: 0 })}`;
    };

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
                        <Dropdown className="dropdown">
                            <Dropdown.Toggle variant="light" id="dropdown-basic" className="dropdown-toggle">
                                Menú
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu">
                                {menuCategories.map((category) => (
                                    <Dropdown.Item key={category} className="dropdown-item">
                                        <NavLink to={`/category/${category}`} className="nav-link text-dark">
                                            {category}
                                        </NavLink>
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
                                {cart.length > 0 && formatPrice(calculateTotalPrice())}
                            </span>
                        </NavLink>
                    </div>
                    <NavLink to="/perfil-usuario" className="nav-link text-light" style={{ fontSize: '20px' }}>
                        <img
                            src={perfilImage || perfilDefaultImage}
                            alt="Perfil usuario"
                            style={{ width: '35px', height: '35px', marginRight: '10px' }}
                        />
                        Perfil Usuario
                    </NavLink>
                </div>
            </Container>
        </div>
    );
}
