const express = require('express');

const router = express.Router();

const auth = require('./validation/authorizeUser.js');
const marketDataValidation = require('./validation/marketDataRequestValidation.js');
const strategyFormatting = require('./validation/strategyFormatting.js');

const strategyBuffer = require('./buffer/strategyBuffer.js')

router.post('/load', auth, strategyBuffer.loadStrategy)

router.post('/save', auth, marketDataValidation.validateTicker, strategyFormatting.strategyFormatCheck, strategyFormatting.strategySorting, strategyBuffer.saveStrategy)

router.post('/delete', auth, marketDataValidation.validateTicker, strategyFormatting.strategyFormatCheck, strategyFormatting.strategySorting, strategyBuffer.deleteStrategy)

module.exports = router;
