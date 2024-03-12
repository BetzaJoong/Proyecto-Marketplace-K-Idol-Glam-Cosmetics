import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './estilos.css';

export default function InicioSesion() {
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/iniciarsesion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, contraseña }),
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('accessToken', data.accessToken);
                navigate('/home');
            } else {
                setError('Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error de inicio de sesión:', error);
            setError('Error del servidor al iniciar sesión');
        }
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
                            <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
                        </div>
                        <button type="submit">Iniciar Sesión</button>
                    </form>
                    {error && <p>{error}</p>}
                    {!error && (
                        <p>¿No tienes una cuenta? <NavLink to="/registrarse">Regístrate</NavLink></p>
                    )}
                </div>
            </div>
        </div>
    );
}
