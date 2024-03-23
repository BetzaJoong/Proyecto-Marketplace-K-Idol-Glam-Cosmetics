// Server.js
const express = require('express');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.use(express.json());
app.use(cors());

app.post('/registrarse', async (req, res) => {
    try {
        const { nombre, email, contraseña, rol } = req.body; // Obtén el rol del cuerpo de la solicitud
        if (!nombre || !email || !contraseña || !rol) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }
        const existingUser = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(409).json({ message: 'El usuario ya está registrado' });
        }
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const newUser = await pool.query(
            'INSERT INTO usuarios (nombre, email, contraseña, rol) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, email, hashedPassword, rol] // Usa el rol proporcionado por el usuario en la solicitud
        );

        const token = jwt.sign({ email: newUser.rows[0].email, rol: newUser.rows[0].rol }, process.env.JWT_SECRET);

        res.json({ usuario: newUser.rows[0], accessToken: token });
    } catch (error) {
        console.error('Error al registrar usuario:', error.message);
        res.status(500).send('Error del servidor al registrar usuario');
    }
});


// Endpoint de inicio de sesión
app.post('/iniciarsesion', async (req, res) => {
    try {
        const { email, contraseña } = req.body;
        const user = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(401).send('Usuario no encontrado');
        }

        const validPassword = await bcrypt.compare(contraseña, user.rows[0].contraseña);
        if (!validPassword) {
            return res.status(401).send('Contraseña incorrecta');
        }
        
        // Generar token de acceso
        const token = jwt.sign({ email: user.rows[0].email, rol: user.rows[0].rol }, process.env.JWT_SECRET);

        // Devolver el token en la respuesta
        res.json({ accessToken: token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
        res.status(500).send('Error del servidor al iniciar sesión');
    }
});


// Obtener perfil de usuario
app.get('/perfil', async (req, res) => {
    try {
        // Verificar si se proporciona un token en el encabezado de autorización
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
        }
        
        // Extraer el token del encabezado de autorización
        const token = req.headers.authorization.split(' ')[1];

        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Consultar la base de datos para obtener el usuario correspondiente al token decodificado
        const user = await pool.query('SELECT nombre, email, rol FROM usuarios WHERE email = $1', [decoded.email]);

        // Verificar si se encontró un usuario
        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Devolver el perfil del usuario con los campos deseados
        console.log(user)
        res.json(user.rows[0]);
    } catch (error) {
        // Manejar errores de verificación del token
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Token de autenticación inválido' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token de autenticación expirado' });
        }
        
        // Manejar otros errores
        console.error('Error al obtener perfil de usuario:', error.message);
        res.status(500).send('Error del servidor al obtener perfil de usuario');
    }
});


// Endpoint para obtener todos los usuarios registrados (solo accesible para administradores)
app.get('/adminusuario', async (req, res) => {
    try {
        // Verificar si se proporciona un token en el encabezado de autorización
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
        }

        // Extraer el token del encabezado de autorización
        const token = req.headers.authorization.split(' ')[1];

        // Verificar y decodificar el token para obtener el usuario
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Verificar si el usuario tiene rol de administrador
        if (decoded.rol !== 'admin') {
            return res.status(403).json({ message: 'Acceso denegado. Este endpoint es solo para administradores' });
        }

        // Obtener todos los usuarios registrados
        const result = await pool.query('SELECT id, nombre, email, rol FROM usuarios');
        const usuarios = result.rows;
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error.message);
        res.status(500).send('Error del servidor al obtener usuarios');
    }
});

// Obtener todos los usuarios registrados
app.get('/usuarios', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        const usuarios = result.rows;
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error.message);
        res.status(500).send('Error del servidor al obtener usuarios');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});








