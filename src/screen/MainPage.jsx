import React from 'react';
import { NavLink } from 'react-router-dom';
import './mainStyle.css';

import maquillaje from '../img/resultados.webp';
import idol from '../img/felix.jpg';
import maquillaje1 from '../img/cristales rojos.jpg';
import maquillaje2 from '../img/maquillaje nct-Taeyong.jpg';
import maquillaje3 from '../img/corazon.jpg';
import maquillaje4 from '../img/makeup hombre.jpg';
import productoDestacado from '../img/glitter.webp';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const MainPage = () => {
    return (
        <div className='body1'>
            <div className="main-page-container">
                <h1>Bienvenido a K-Idol Glam Cosmetics</h1>
                <p>¡Donde el mundo del K-pop y el maquillaje se encuentran!</p>
                <img src={maquillaje} alt="Resultados" className='borde' />
                <p>Regístrate ahora para obtener acceso exclusivo a nuestros productos inspirados en los maquillajes de idols del K-pop.</p>

                {/* Botones de inicio de sesión y registro */}
                <div className="auth-buttons">
                    <NavLink to="/registrarse" className="btn btn-primary">Registrarse</NavLink>
                    <NavLink to="/iniciar-sesion" className="btn btn-secondary">Iniciar Sesión</NavLink>
                </div>

                <div className="brand-description">
                    <h2>Sobre Nosotros</h2>
                    <p>K-Idol Glam Cosmetics es una marca de maquillaje inspirada en los estilos únicos y vibrantes de los idols del K-pop. Nuestros productos están diseñados para ayudarte a recrear esos looks deslumbrantes y expresar tu estilo individual.</p>
                    <img src={idol} alt="Maquillaje de Idol 1" />
                </div>
                <div className="gallery">
                    <h2>Maquillajes de Idols</h2>
                    <div className="image-gallery">
                        <img src={maquillaje1} alt="Maquillaje de Idol 1" />
                        <img src={maquillaje2} alt="Maquillaje de Idol 2" />
                        <img src={maquillaje3} alt="Maquillaje de Idol 3" />
                        <img src={maquillaje4} alt="Maquillaje de Idol 4" />
                    </div>
                </div>
                <div className="banner">
                    <h5><i class="bi bi-arrow-through-heart-fill"></i>¡Oferta Especial!<i class="bi bi-arrow-through-heart-fill"></i></h5>
                    <h6 className='banner-text'>Aprovecha nuestro descuento del 10% en todos los productos utilizando el código <strong>KIDOL10</strong>.</h6>
                </div>
                <div className="featured-product">
                    <h2>Producto Destacado</h2>
                    <div className="product-item">
                        <img src={productoDestacado} alt="Producto Destacado" />
                        <h3>Delineador de Glitter</h3>
                        <p>Añade brillo a tu maquillaje, sin restos molestos que van cayendo como consecuencia del paso del tiempo. Puede ser usada en los párpados, uñas e incluso en los labios. </p>
                        <h6 className='comprar'><i class="bi bi-bag-heart-fill"></i>Registrate y compra ahora<i class="bi bi-bag-heart-fill"></i></h6>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
