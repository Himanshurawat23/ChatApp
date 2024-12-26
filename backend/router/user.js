const express = require('express');
const { SignUp, login, logout } = require('../controller/user');
const router = express.Router();



router.post('/signup', SignUp);
router.post('/login', login);
router.get('/logout',logout);

module.exports = router;