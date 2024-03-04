// multer.js


const express = require('express');
const multer = require('multer');
const perfilController = require('./perfilcontroller');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Directorio donde se guardarán los archivos

router.post('/cambiar-foto-perfil', upload.single('fotoPerfil'), perfilController.cambiarFotoPerfil);

module.exports = router;
