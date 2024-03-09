import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './estilos.css';

export default function InicioSesion() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de inicio de sesión
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica de autenticación, si la autenticación es exitosa, actualizamos el estado de inicio de sesión
        setIsLoggedIn(true);
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
                    {/* Renderizado condicional para ocultar los botones de registro e inicio de sesión si el usuario ha iniciado sesión */}
                    {!isLoggedIn && (
                        <p>¿No tienes una cuenta? <NavLink to="/registrarse">Regístrate</NavLink></p>
                    )}
                </div>
            </div>
        </div>
    );
}



// import React, { useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import './estilos.css';

// export default function InicioSesion() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('/inicio-sesion', {  // Cambia la URL aquí
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email, password }),
//             });
//             if (response.ok) {
//                 console.log('Inicio de sesión exitoso');
//                 setIsLoggedIn(true);
//                 navigate('/home');
//             } else {
//                 console.error('Credenciales incorrectas');
//             }
//         } catch (error) {
//             console.error('Error al iniciar sesión:', error);
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
//                             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//                         </div>
//                         <div className="form-group">
//                             <label>Contraseña:</label>
//                             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                         </div>
//                         <button type="submit">Iniciar Sesión</button>
//                     </form>
//                     {!isLoggedIn && (
//                         <p>¿No tienes una cuenta? <NavLink to="/registrarse">Regístrate</NavLink></p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }
