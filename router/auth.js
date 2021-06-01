const express = require('express');
const authController = require('../mvc/auth')
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;