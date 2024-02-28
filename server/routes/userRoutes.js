const express = require('express');
const router = express.Router();
const userController = require('./userController');

router.post('/register', (req, res) => userController.registerUser(req, res, pool));
router.post('/login', (req, res) => userController.loginUser(req, res, pool));

module.exports = router;



