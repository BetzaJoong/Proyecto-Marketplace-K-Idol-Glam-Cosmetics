const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Ruta para crear una nueva publicación
app.post('/api/publicaciones', (req, res) => {
    try {
        const nuevaPublicacion = req.body;

        // Leer el archivo JSON actual
        const makeupData = JSON.parse(fs.readFileSync('public/makeup.json', 'utf8'));

        // Generar un nuevo ID para la publicación
        const nuevoId = `P${makeupData.length + 1}`;

        // Asignar el nuevo ID a la publicación y agregarla al arreglo
        nuevaPublicacion.id = nuevoId;
        makeupData.push(nuevaPublicacion);

        // Escribir el arreglo actualizado de publicaciones de nuevo en el archivo JSON
        fs.writeFileSync('public/makeup.json', JSON.stringify(makeupData, null, 4));

        res.status(201).json({ message: 'Publicación creada con éxito', id: nuevoId });
    } catch (error) {
        console.error('Error al crear la publicación:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
