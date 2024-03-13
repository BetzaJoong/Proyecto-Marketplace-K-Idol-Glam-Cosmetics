// Registro.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './estilos.css';

export default function Registro() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5003/registrarse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, email, contraseña }),
            });
            if (response.ok) {
                console.log('Usuario registrado exitosamente');
                navigate('/iniciosesion'); 
            } else {
                // Verificar si la respuesta no está vacía
                const text = await response.text();
                const data = text ? JSON.parse(text) : {};
                setError(data.message || 'Error al registrar usuario');
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            setError('Error al conectar con el servidor');
        }
    };

    return (
        <div className="body2">
            <div className="login-register-container">
                <div className="form-container">
                    <h2>Registro</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Contraseña:</label>
                            <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
                        </div>
                        <button type="submit">Registrarse</button>
                    </form>
                    {error && <p>{error}</p>}
                    <p>¿Ya tienes una cuenta? <NavLink to="/iniciosesion">Inicia sesión</NavLink></p>
                </div>
            </div>
        </div>
    );
}
