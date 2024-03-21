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

// Endpoint de registro
// app.post('/registrarse', async (req, res) => {
//     try {
//         const { nombre, email, contraseña } = req.body;
//         const rol = 'usuario';
//         if (!nombre || !email || !contraseña) {
//             return res.status(400).json({ message: 'Todos los campos son obligatorios' });
//         }
//         const existingUser = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
//         if (existingUser.rows.length > 0) {
//             return res.status(409).json({ message: 'El usuario ya está registrado' });
//         }
//         const hashedPassword = await bcrypt.hash(contraseña, 10);
//         const newUser = await pool.query(
//             'INSERT INTO usuarios (nombre, email, contraseña, rol) VALUES ($1, $2, $3, $4) RETURNING *',
//             [nombre, email, hashedPassword, rol]
//         );

//         const token = jwt.sign({ email: newUser.rows[0].email, rol: newUser.rows[0].rol }, process.env.JWT_SECRET);

//         res.json({ usuario: newUser.rows[0], accessToken: token });
//     } catch (error) {
//         console.error('Error al registrar usuario:', error.message);
//         res.status(500).send('Error del servidor al registrar usuario');
//     }
// });

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


// Endpoint para agregar un producto a los favoritos de un usuario
app.post('/favoritos/agregar', async (req, res) => {
    try {
        // Verificar si se proporciona un token en el encabezado de autorización
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
        }

        // Extraer el token del encabezado de autorización
        const token = req.headers.authorization.split(' ')[1];

        // Verificar y decodificar el token para obtener el usuario
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Verificar si el producto ya está en los favoritos del usuario
        const { productId } = req.body;
        const result = await pool.query(
            'SELECT * FROM favoritos WHERE usuario_id = $1 AND producto_id = $2',
            [decoded.userId, productId]
        );

        if (result.rows.length > 0) {
            return res.status(409).json({ message: 'El producto ya está en los favoritos del usuario' });
        }

        // Agregar el producto a los favoritos del usuario
        await pool.query(
            'INSERT INTO favoritos (usuario_id, producto_id) VALUES ($1, $2)',
            [decoded.userId, productId]
        );

        res.status(201).json({ message: 'Producto agregado a favoritos correctamente' });
    } catch (error) {
        // Manejar errores
        console.error('Error al agregar producto a favoritos:', error.message);
        res.status(500).send('Error del servidor al agregar producto a favoritos');
    }
});

// Endpoint para obtener los favoritos de un usuario
app.get('/favoritos', async (req, res) => {
    try {
        // Verificar si se proporciona un token en el encabezado de autorización
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
        }

        // Extraer el token del encabezado de autorización
        const token = req.headers.authorization.split(' ')[1];

        // Verificar y decodificar el token para obtener el usuario
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Obtener los productos favoritos del usuario
        const result = await pool.query(
            'SELECT * FROM favoritos WHERE usuario_id = $1',
            [decoded.userId]
        );

        const favoritos = result.rows.map(row => row.producto_id);
        res.json({ favoritos });
    } catch (error) {
        // Manejar errores
        console.error('Error al obtener favoritos:', error.message);
        res.status(500).send('Error del servidor al obtener favoritos');
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






// También con detalles

// // Agregar productos
// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const { Pool } = require('pg');
// const cors = require('cors'); // Importa el paquete CORS

// const app = express();
// const PORT = process.env.PORT || 5003;

// // Middleware para manejar JSON y CORS
// app.use(bodyParser.json());
// app.use(cors()); // Habilita CORS para todas las solicitudes

// // Configuración de la conexión a la base de datos PostgreSQL
// const pool = new Pool({
//     user: "postgres",
//     host: "localhost",
//     database: "productos",
//     password: "1234",
//     port: 5432,
// });

// // Ruta para obtener todas las publicaciones
// app.get('/publicaciones', (req, res) => {
//     const jsonFilePath = './public/makeup.json'; // Ruta del archivo JSON
//     fs.readFile(jsonFilePath, 'utf8', (err, data) => {
//         if (err) {
//             console.error('Error al leer el archivo JSON', err);
//             return res.status(500).send('Error interno del servidor');
//         }
//         const publicaciones = JSON.parse(data);
//         res.json(publicaciones);
//     });
// });

// // Ruta para agregar un nuevo producto
// app.post('/publicaciones', express.json(), async (req, res) => {
//     const { categoria, descripcion, id_producto, img, ingredients, name, marca, precio } = req.body;
//     try {
//         const result = await pool.query('INSERT INTO publicaciones (categoria, descripcion, id_producto, img, ingredients, name, marca, precio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [categoria, descripcion, id_producto, img, ingredients, name, marca, precio]);

//         const nuevoProducto = result.rows[0];

//         // Después de insertar el producto en la base de datos, también lo agregamos al archivo JSON
//         const jsonFilePath = './public/makeup.json'; // Ruta del archivo JSON
//         fs.readFile(jsonFilePath, 'utf8', (err, data) => {
//             if (err) {
//                 console.error('Error al leer el archivo JSON', err);
//                 return res.status(500).send('Error interno del servidor');
//             }

//             const productos = JSON.parse(data);

//             // Agregar el nuevo producto al array de productos
//             productos.push({
//                 id: nuevoProducto.id,
//                 categoria: nuevoProducto.categoria,
//                 descripcion: nuevoProducto.descripcion,
//                 id_producto: nuevoProducto.id_producto,
//                 img: nuevoProducto.img,
//                 ingredients: nuevoProducto.ingredients,
//                 name: nuevoProducto.name,
//                 marca: nuevoProducto.marca,
//                 precio: parseFloat(nuevoProducto.precio),
//                 likes: nuevoProducto.likes
//             });

//             // Escribir los datos actualizados de nuevo al archivo JSON
//             fs.writeFile(jsonFilePath, JSON.stringify(productos, null, 2), err => {
//                 if (err) {
//                     console.error('Error al escribir en el archivo JSON', err);
//                     return res.status(500).send('Error interno del servidor');
//                 }
//                 console.log('Producto agregado con éxito');
//                 res.status(201).json({ message: 'Producto agregado con éxito', producto: nuevoProducto });
//             });
//         });
//     } catch (error) {
//         console.error('Error al agregar el nuevo producto:', error);
//         res.status(500).json({ message: 'Error al agregar el nuevo producto.' });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
// });

