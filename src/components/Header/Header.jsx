import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './headerStyle.css';
import './typewrite.css';

export default function Header() {
    useEffect(() => {
        function applyTypewriterEffect(selector) {
            const element = document.querySelector(selector);
            if (element) {
                const text = element.innerHTML;
                element.innerHTML = '';
                for (let i = 0; i < text.length; i++) {
                    setTimeout(() => {
                        element.innerHTML += text[i];
                    }, i * 50); // Ajusta la velocidad de escritura aquí
                }
            }
        }

        applyTypewriterEffect('.header-title');
        applyTypewriterEffect('.header-description');
    }, []);

    return (
        <header className="header">
            <div className="header-bg"></div>
            <Container className="header-content">
                <div>
                    <h1 className="header-title typewriter-text">¡K-Idol Glam Cosmetics!</h1>
                    <p className="header-description typewriter-text">¡Siente la energía del K-pop en cada pincelada!</p>
                    <div className="decoration-line"></div>
                </div>
            </Container>
        </header>
    );
}
