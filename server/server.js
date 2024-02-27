const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const userRoutes = require('./routes/userRoutes');
const app = express();

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'usuarios',
    password: '1234',
    port: 5432,
});

app.use(bodyParser.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = {
    app,
    pool
};

