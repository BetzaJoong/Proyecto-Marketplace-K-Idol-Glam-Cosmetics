// import React, { useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import './estilos.css';

// export default function InicioSesion() {
//     const [email, setEmail] = useState('');
//     const [contraseña, setContraseña] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('http://localhost:5003/iniciarsesion', { 
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email, contraseña }),
//             });
//             if (response.ok) {
//                 const data = await response.json();
//                 localStorage.setItem('accessToken', data.accessToken);
//                 navigate('/home');
//             } else {
//                 const errorMessage = await response.text(); // Obtener el mensaje de error del servidor
//                 setError(errorMessage || 'Credenciales incorrectas');
//             }
//         } catch (error) {
//             console.error('Error de inicio de sesión:', error);
//             setError('Error del servidor al iniciar sesión');
//         }
//     };

//     return (
//         <div className="body2">
//             <div className="login-register-container">
//                 <div className="form-container">
//                     <h2>Iniciar Sesión</h2>
//                     <form onSubmit={handleSubmit}>
//                         <div className="form-group">
//                             <label>Email:</label>
//                             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                         </div>
//                         <div className="form-group">
//                             <label>Contraseña:</label>
//                             <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required />
//                         </div>
//                         <button type="submit">Iniciar Sesión</button>
//                     </form>
//                     {error && <p>{error}</p>}
//                     {!error && (
//                         <p>¿No tienes una cuenta? <NavLink to="/registrarse">Regístrate</NavLink></p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }




// InicioSesion.jsx

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './estilos.css';
import InicioNavbar from '../components/Navbar/InicioNavbar';

export default function InicioSesion({ setLoggedIn, setUsuario }) {
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
                // Obtener el perfil de usuario después de iniciar sesión
                await fetchUserProfile();
                setLoggedIn(true);
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

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (token) {
                const response = await fetch('http://localhost:5003/perfil', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const userProfile = await response.json();
                    setUsuario(userProfile);
                } else {
                    console.error('Error al obtener perfil de usuario');
                }
            }
        } catch (error) {
            console.error('Error al obtener perfil de usuario:', error);
        }
    };

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
