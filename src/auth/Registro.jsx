import React, { useState, useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './estilos.css';
import InicioNavbar from '../components/Navbar/InicioNavbar';

export default function Registro() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [rol, setRol] = useState('usuario'); // Por defecto, el rol será 'usuario'
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
                body: JSON.stringify({ nombre, email, contraseña, rol }), // Incluye el rol en la solicitud
            });
            if (response.ok) {
                console.log('Usuario registrado exitosamente');
                navigate('/iniciarsesion'); 
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

    useEffect(() => {
        // Cada vez que el componente se monte o actualice, hacer scroll al principio de la página
        window.scrollTo(0, 0);
    }, []); // El array vacío como segundo argumento asegura que este efecto solo se ejecute una vez, después de que el componente se monte


    return (
        <div className="body2">
            <InicioNavbar title="Registro"/>
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
                        <div className="form-group">
                            <label>Rol:</label>
                            <select value={rol} onChange={(e) => setRol(e.target.value)}>
                                <option value="user">Usuario</option>
                                <option value="admin">Administrador</option>
                            </select>
                        </div>
                        <button type="submit">Registrarse</button>
                    </form>
                    {error && <p>{error}</p>}
                    <p>¿Ya tienes una cuenta? <NavLink to="/iniciarsesion">Inicia sesión</NavLink></p>
                </div>
            </div>
        </div>
    );
}
