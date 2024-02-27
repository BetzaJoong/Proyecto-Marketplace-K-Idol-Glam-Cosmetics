import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import makeupImage from '../../img/Logo.png';
import { useAppContext } from '../../context/MakeupContext';
import Menu from '../Menu/Menu';
import './navStyles.css';

export default function MakeupNavbar() {
    const { cart, calculateTotalPrice } = useAppContext();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar si el usuario ha iniciado sesión

    // Función para formatear el precio sin decimales
    const formatPrice = (price) => {
        return price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 });
    };

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
                    {!isLoggedIn && ( // Mostrar el menú solo si el usuario no ha iniciado sesión
                        <div className="d-flex align-items-center">
                            <Menu />
                        </div>
                    )}
                    <div className="d-flex">
                        {isLoggedIn && ( // Mostrar el carrito solo si el usuario ha iniciado sesión
                            <NavLink to="/carrito" className="nav-link text-light cart-link" style={{ fontSize: '30px' }}>
                                <img
                                    src={carroImage}
                                    alt="Carro"
                                    style={{ width: '35px', height: '35px', marginBottom: '10px' }}
                                />
                                <span className="cart-text">
                                    {cart.length > 0 && `${formatPrice(calculateTotalPrice())}`}
                                </span>
                            </NavLink>
                        )}
                        {!isLoggedIn && ( // Mostrar botones de inicio de sesión y registro si el usuario no ha iniciado sesión
                            <>
                                <NavLink to="/registrarse" className="nav-link text-light" style={{ fontSize: '20px', marginRight: '10px' }}>Registrarse</NavLink>
                                <NavLink to="/iniciar-sesion" className="nav-link text-light" style={{ fontSize: '20px' }}>Iniciar Sesión</NavLink>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
}
