const jwt = require('jsonwebtoken');

// Middleware para verificar la autenticación del usuario
const authenticateUser = (req, res, next) => {
    // Obtener el token de autorización del encabezado
    const token = req.headers.authorization;

    // Verificar si hay un token
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, 'your_secret_key'); // Cambia 'your_secret_key' por tu propia clave secreta
        req.user = decoded.user; // Agregar el usuario decodificado al objeto de solicitud
        next(); // Pasar al siguiente middleware
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authenticateUser;

