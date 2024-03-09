// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const { Pool } = require('pg');

// const app = express();
// const PORT = process.env.PORT || 5003;

// // Middleware para manejar JSON
// app.use(bodyParser.json());

// // Configuración de la conexión a la base de datos PostgreSQL
// const pool = new Pool({
//     user: "postgres",
//     host: "localhost",
//     database: "productos",
//     password: "1234",
//     port: 5432,
// });

// // Ruta para obtener todas las publicaciones
// app.get('/api/publicaciones', (req, res) => {
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
// app.post('/api/publicaciones', async (req, res) => {
//     // Extraer los datos del producto del cuerpo de la solicitud
//     const { categoria, descripcion, id_producto, img, ingredients, name, marca, precio } = req.body;

//     try {
//         // Insertar el producto en la base de datos
//         const result = await pool.query('INSERT INTO publicaciones (categoria, descripcion, id_producto, img, ingredients, name, marca, precio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [categoria, descripcion, id_producto, img, JSON.stringify(ingredients), name, marca, precio]);

//         // Nuevo producto insertado en la base de datos
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
//                 category: nuevoProducto.categoria,
//                 desc: nuevoProducto.descripcion,
//                 id: nuevoProducto.id_producto,
//                 img: nuevoProducto.img,
//                 ingredients: JSON.parse(nuevoProducto.ingredients),
//                 name: nuevoProducto.name,
//                 marca: nuevoProducto.marca,
//                 price: nuevoProducto.precio,
//                 likes: 0
//             });

//             // Escribir los datos actualizados de nuevo al archivo JSON
//             fs.writeFile(jsonFilePath, JSON.stringify(productos, null, 2), err => {
//                 if (err) {
//                     console.error('Error al escribir en el archivo JSON', err);
//                     return res.status(500).send('Error interno del servidor');
//                 }
//                 console.log('Producto agregado con éxito');
//                 res.status(200).send('Producto agregado con éxito');
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



// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const { Pool } = require('pg');

// const app = express();
// const PORT = process.env.PORT || 5003;

// // Middleware para manejar JSON
// app.use(bodyParser.json());

// // Configuración de la conexión a la base de datos PostgreSQL
// const pool = new Pool({
//     user: "postgres",
//     host: "localhost",
//     database: "productos",
//     password: "1234",
//     port: 5432,
// });

// // Ruta para obtener todas las publicaciones
// app.get('/api/publicaciones', (req, res) => {
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
// app.post('/api/publicaciones', async (req, res) => {
//     const { categoria, descripcion, id_producto, img, ingredients, name, marca, precio } = req.body;

//     try {
//         const result = await pool.query('INSERT INTO publicaciones (categoria, descripcion, id_producto, img, ingredients, name, marca, precio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [categoria, descripcion, id_producto, img, JSON.stringify(ingredients), name, marca, precio]);

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
//                 ingredients: JSON.parse(nuevoProducto.ingredients),
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
// app.get('/api/publicaciones', (req, res) => {
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
// app.post('/api/publicaciones', async (req, res) => {
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




// Registro-Inicio de sesion
const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5003;

// Configura la conexión a la base de datos
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "productos",
    password: "1234",
    port: 5432,
});

// Middleware para analizar el cuerpo de las solicitudes entrantes como JSON
app.use(express.json());

// Ruta para manejar el registro de usuarios
app.post('/registro', async (req, res) => {
    try {
        const { nombre, email, contraseña } = req.body;
        const newUser = await pool.query(
            'INSERT INTO usuarios (nombre, email, contraseña) VALUES ($1, $2, $3) RETURNING *',
            [nombre, email, contraseña]
        );
        res.json(newUser.rows[0]);
    } catch (error) {
        console.error('Error al registrar usuario:', error.message);
        res.status(500).send('Error del servidor al registrar usuario');
    }
});

// Ruta para manejar el inicio de sesión de usuarios
app.post('/inicio-sesion', async (req, res) => {
    try {
        const { email, contraseña } = req.body;
        const user = await pool.query('SELECT * FROM usuarios WHERE email = $1 AND contraseña = $2', [
            email,
            contraseña,
        ]);
        if (user.rows.length > 0) {
            res.json(user.rows[0]);
        } else {
            res.status(401).send('Credenciales incorrectas');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
        res.status(500).send('Error del servidor al iniciar sesión');
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
