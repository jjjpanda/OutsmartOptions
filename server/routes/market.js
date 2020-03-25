const express = require('express');

const router = express.Router();

const env = require('dotenv').config();

const tradikey = process.env.tradier;
const alphakey = process.env.alpha;

// const Earnings = require('../daemons/db/Earnings');

const validate = require('./validation/marketDataRequestValidation.js');
const validateBody = require('./validation/validateBody.js');
const prepareAnswer = require('./buffer/prepareAnswer.js');

const tradierBuffer = require('./buffer/tradierBuffer.js');
const yFinanceBuffer = require('./buffer/yFinanceBuffer.js');
const treasuryBuffer = require('./buffer/treasuryBuffer.js');

const optionsCalculation = require('./calculation/optionsCalculation.js');
const noCheckSend = require('./calculation/noCheckSend.js');

router.post('/quote', validateBody, validate.validateTicker, prepareAnswer, tradierBuffer.getQuotes, yFinanceBuffer.getQuote, noCheckSend('quote'));

router.post('/chain', validateBody, validate.validateTicker, prepareAnswer, tradierBuffer.getQuotes, yFinanceBuffer.getQuote, treasuryBuffer.getYieldCurve, tradierBuffer.getChainExpiries, noCheckSend('chain'));

router.post('/optionsQuote', validateBody, validate.validateTicker, prepareAnswer, tradierBuffer.getQuotes, yFinanceBuffer.getQuote, treasuryBuffer.getYieldCurve, tradierBuffer.getChainExpiries, optionsCalculation.getOptionsQuote, noCheckSend('optionsQuote'));

router.post('/historical', validateBody, validate.validateTicker, validate.validateDays, prepareAnswer, tradierBuffer.getHistoricalData, noCheckSend('historical'));

router.post('/iv', validateBody, validate.validateTicker, validate.validateDays, validate.validateIVLength, prepareAnswer, tradierBuffer.getHistoricalData, tradierBuffer.getHistoricalIV, optionsCalculation.getHistoricalIV, noCheckSend('historicalIV'));

router.post('/guessSymbol', validateBody, validate.validateText, prepareAnswer, tradierBuffer.guessSymbol, noCheckSend('guesses'));

router.post('/yields', validateBody, prepareAnswer, treasuryBuffer.getYieldCurve, noCheckSend('yields'));

module.exports = router;
