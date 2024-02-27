import React from 'react';
import './footerStyle.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h6>¡Todos los derechos reservados! &copy; {new Date().getFullYear()}</h6>
                        <div class="container"><small>Copyright &copy; Betza Sánchez 2024</small></div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
