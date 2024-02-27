const bcrypt = require('bcryptjs');

const registerUser = async (req, res, pool) => {
    try {
        const { fullName, email, password } = req.body;

        // Verificar si el usuario ya existe
        const existingUserQuery = 'SELECT * FROM users WHERE email = $1';
        const existingUserResult = await pool.query(existingUserQuery, [email]);

        if (existingUserResult.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar nuevo usuario en la base de datos
        const insertUserQuery = 'INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3)';
        await pool.query(insertUserQuery, [fullName, email, hashedPassword]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const loginUser = async (req, res, pool) => {
    try {
        const { email, password } = req.body;

        // Buscar el usuario por su correo electrónico
        const userQuery = 'SELECT * FROM users WHERE email = $1';
        const userResult = await pool.query(userQuery, [email]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = userResult.rows[0];

        // Verificar la contraseña
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    registerUser,
    loginUser
};


