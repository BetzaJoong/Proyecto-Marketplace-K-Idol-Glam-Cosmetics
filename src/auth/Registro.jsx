// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import './estilos.css';

// export default function Registro() {
//     const [fullName, setFullName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Enviar los datos del formulario al backend para el registro
//         console.log('Datos de registro:', { fullName, email, password });
//         // Lógica para enviar los datos al backend...
//     };

//     return (
//         <div className="body2">
//             <div className="login-register-container"> {/* Agrega la clase login-register-container aquí */}
//                 <div className="form-container">
//                     <h2>Registro</h2>
//                     <form onSubmit={handleSubmit}>
//                         <div className="form-group">
//                             <label>Name:</label>
//                             <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
//                         </div>
//                         <div className="form-group">
//                             <label>Email:</label>
//                             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//                         </div>
//                         <div className="form-group">
//                             <label>Contraseña:</label>
//                             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                         </div>
//                         <button type="submit">Registrarse</button>
//                     </form>
//                     <p>¿Ya tienes una cuenta? <NavLink to="/iniciar-sesion">Inicia sesión</NavLink></p>
//                 </div>
//             </div>
//         </div>
//     );
// }



import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './estilos.css';

export default function Registro() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullName, email, password }),
            });
            if (response.ok) {
                console.log('Usuario registrado exitosamente');
                // Aquí puedes redirigir al usuario a la página de inicio de sesión
            } else {
                console.error('Error al registrar usuario:', response.statusText);
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
        }
    };

    return (
        <div className="body2">
            <div className="login-register-container">
                <div className="form-container">
                    <h2>Registro</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Contraseña:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit">Registrarse</button>
                    </form>
                    <p>¿Ya tienes una cuenta? <NavLink to="/iniciar-sesion">Inicia sesión</NavLink></p>
                </div>
            </div>
        </div>
    );
}
