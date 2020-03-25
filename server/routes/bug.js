const express = require('express');

const router = express.Router();

const validateBody = require('./validation/validateBody.js');
const validation = require('./validation/bugValidation.js');
const buffer = require('./buffer/bugBuffer.js')

router.post('/track', validateBody, validation.validateIP, buffer.getIP, buffer.ipBuffer);

router.post('/report', validateBody, validation.validateOptions, buffer.reportBuffer);

router.post('/imageReport', validation.validateFile, buffer.imageBuffer);

module.exports = router;
