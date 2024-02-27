import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './estilos.css';

export default function InicioSesion() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Enviar los datos del formulario al backend para el inicio de sesión
        console.log('Datos de inicio de sesión:', { email, password });
        // Lógica para enviar los datos al backend...

        // Después de procesar el inicio de sesión exitoso, redirigir al usuario al home
        navigate('/home');
    };

    return (
        <div className="body2">
            <div className="login-register-container">
                <div className="form-container">
                    <h2>Iniciar Sesión</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Contraseña:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit">Iniciar Sesión</button>
                    </form>
                    <p>¿No tienes una cuenta? <NavLink to="/registrarse">Regístrate</NavLink></p>
                </div>
            </div>
        </div>
    );
}
