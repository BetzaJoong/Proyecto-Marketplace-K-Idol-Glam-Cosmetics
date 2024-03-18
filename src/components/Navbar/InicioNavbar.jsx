// // MakeupNavbar.jsx
import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Dropdown } from 'react-bootstrap';
import makeupImage from '../../img/Logo.png';
import carroImage from '../../img/carrito-de-compras.png';
import perfilDefaultImage from '../../img/glitter.webp';
import { AppContext } from '../../context/MakeupContext';
import './navStyles.css';

export default function InicioNavbar({title}) {
 

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
                        {/* EJEMPLO DE TITLE */}
                        {/* <span>{title}</span> */}
                    </div>
             
             
                </div>
            </Container>
        </div>
    );
}