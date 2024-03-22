import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import InicioNavbar from '../components/Navbar/InicioNavbar';
import {useAppContext} from "../context/MakeupContext"
import './estilos.css';

export default function InicioSesion() {
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {setUsuario, setLoggedIn, setIsAdmin} = useAppContext()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5003/iniciarsesion', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, contraseña }),
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('accessToken', data.accessToken);
                /*  */
                /*  */
                const token = localStorage.getItem('accessToken');
                console.log("ESTOY EN EL USE EFFECTO DEL TOKEN :", token)
                if (token) {
                    fetch('http://localhost:5003/perfil', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    })
                    .then(response => {
                
                        if (response.ok) {
                            return response;
                        }
                        if (response.status === 401) {
                            throw new Error('Usuario no autenticado');
                        }
                        throw new Error('Error al obtener el perfil del usuario');
                    })
                    .then(async data => {
                        let dataJson = await data.json()
                        console.log("----------DATA---------------")
                        console.log("----------DATA---------------")
                  
                        console.log(dataJson)
        
                        console.log("----------DATA---------------")
                        console.log("----------DATA---------------")
                        setUsuario(dataJson);
                        setLoggedIn(true);
                        setIsAdmin(dataJson.rol === 'admin'); // Establecer el estado de isAdmin según el rol del usuario
                    })
                    .catch(error => {
                        console.error('Error al obtener perfil de usuario:', error.message);
                        setLoggedIn(false);
                        setUsuario(null);
                        setIsAdmin(false);
                    });
                } else {
                    setLoggedIn(false);
                    setUsuario(null);
                    setIsAdmin(false);
                }
                /*  */
                /*  */
                
                navigate('/home');
            } else {
                const errorMessage = await response.text(); // Obtener el mensaje de error del servidor
                setError(errorMessage || 'Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error de inicio de sesión:', error);
            setError('Error del servidor al iniciar sesión');
        }
    };

    useEffect(() => {
        // Cada vez que el componente se monte o actualice, hacer scroll al principio de la página
        window.scrollTo(0, 0);
    }, []); // El array vacío como segundo argumento asegura que este efecto solo se ejecute una vez, después de que el componente se monte



    return (
        <div className="body2">
            <InicioNavbar title = "Inicio de Sesion"/>
            <div className="login-register-container">
                <div className="form-container">
                    <h2>Iniciar Sesión</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email:</label> 
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Contraseña:</label>
                            <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required />
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




