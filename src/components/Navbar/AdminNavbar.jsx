import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Dropdown } from 'react-bootstrap';
import makeupImage from '../../img/Logo.png';
import perfilDefaultImage from '../../img/glitter.webp';
import './navStyles.css';

export default function AdminNavbar({ loggedIn, usuario, perfilImage }) {
    const [menuCategories, setMenuCategories] = useState([]);
    const [error, setError] = useState(null);

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
                    {loggedIn && usuario && usuario.rol === 'admin' && (
                        <NavLink to="/perfil-administrador" className="nav-link text-light" style={{ fontSize: '20px' }}>
                            <img
                                src={perfilImage || perfilDefaultImage}
                                alt="Perfil Administrador"
                                style={{ width: '35px', height: '35px', marginRight: '10px' }}
                            />
                            Perfil Administrador
                        </NavLink>
                    )}
                </div>
            </Container>
        </div>
    );
}
