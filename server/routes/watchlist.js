const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');

const auth = require('./validation/authorizeUser')(jwt);
const validateBody = require('./validation/validateBody.js');
const marketValidation = require('./validation/marketDataRequestValidation.js')

const prepareAnswer = require('./buffer/prepareAnswer.js')
const tradierBuffer = require('./buffer/tradierBuffer.js')
const buffer = require('./buffer/watchlistBuffer.js')

router.post('/view', validateBody, auth, buffer.viewWatchlist);

router.post('/add', validateBody, auth, marketValidation.validateTicker, prepareAnswer, tradierBuffer.getQuotes, buffer.addToWatchlist);

router.post('/remove', validateBody, auth, marketValidation.validateTicker, buffer.removeFromWatchlist);

//Deprecated
router.post('/edit', validateBody, auth, buffer.editWatchlist);

module.exports = router;
