const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('./validation/authorizeUser')(jwt);

const userBuffer = require("./buffer/userBuffer.js")

router.post('/register', userBuffer.registerUser);

router.post('/login', userBuffer.loginUser);

router.post('/current', auth, userBuffer.currentUser);

router.post('/change', auth, userBuffer.changePassword);

router.post('/delete', auth, userBuffer.deleteUser);

module.exports = router;
