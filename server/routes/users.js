const express = require('express');

const router = express.Router();

const auth = require('./validation/authorizeUser.js');
const validateBody = require('./validation/validateBody.js');
const validate = require('./validation/userValidation.js');

const userBuffer = require('./buffer/userBuffer.js');

router.post('/register', validateBody, validate.validateRegister, userBuffer.registerUser);

router.post('/login', validateBody, validate.validateLogin, userBuffer.loginUser);

router.post('/current', validateBody, auth, userBuffer.currentUser);

router.post('/change', validateBody, validate.validatePasswordChange, auth, userBuffer.changePassword);

router.post('/delete', validateBody, auth, userBuffer.deleteUser);

module.exports = router;
