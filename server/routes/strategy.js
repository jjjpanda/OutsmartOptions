const express = require('express');

const router = express.Router();

const validateBody = require('./validation/validateBody.js');
const auth = require('./validation/authorizeUser.js');
const marketDataValidation = require('./validation/marketDataRequestValidation.js');
const strategyFormatting = require('./validation/strategyFormatting.js');

const strategyBuffer = require('./buffer/strategyBuffer.js');

router.post('/load', validateBody, auth, strategyBuffer.loadStrategy);

router.post('/save', validateBody, auth, marketDataValidation.validateTicker, strategyFormatting.strategyFormatCheck, strategyFormatting.strategyNameCheck, strategyFormatting.strategySorting, strategyBuffer.saveStrategy);

router.post('/delete', validateBody, auth, marketDataValidation.validateTicker, strategyFormatting.strategyFormatCheck, strategyFormatting.strategyNameCheck, strategyFormatting.strategySorting, strategyBuffer.deleteStrategy);

module.exports = router;
