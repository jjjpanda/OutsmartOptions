const express = require('express');

const router = express.Router();

const validateBody = require('./validation/validateBody.js')
const validation = require('./validation/twitterValidation.js')
const prepare = require('./buffer/prepareAnswer.js')
const buffer = require('./buffer/twitterBuffer.js')
const noCheckSend = require('./calculation/noCheckSend.js')

router.post('/search', validateBody, validation.qValidation, prepare, buffer.getTweets, noCheckSend('tweets'));

module.exports = router;
