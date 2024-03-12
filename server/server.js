//Registro y inicio de sesion
const express = require('express');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();
const validateToken = require('./middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5003;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.use(express.json());
app.use(cors());

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Endpoint de registro con validación de datos
app.post('/registrarse', async (req, res) => {
    try {
        const { nombre, email, contraseña, rol } = req.body;
        // Valida los datos del usuario
        if (!nombre || !email || !contraseña || !rol) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }
        // Verifica si el usuario ya está registrado
        const existingUser = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(409).json({ message: 'El usuario ya está registrado' });
        }
        // Inserta el nuevo usuario en la base de datos
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const newUser = await pool.query(
            'INSERT INTO usuarios (nombre, email, contraseña, rol) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, email, hashedPassword, rol]
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

        const token = jwt.sign({ email: user.rows[0].email, rol: user.rows[0].rol }, process.env.JWT_SECRET);

        res.json({ accessToken: token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
        res.status(500).send('Error del servidor al iniciar sesión');
    }
});

// Ruta GET para obtener todos los usuarios registrados
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

