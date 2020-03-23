const express = require('express');

const router = express.Router();

const env = require('dotenv').config();

const tradikey = process.env.tradier;
const alphakey = process.env.alpha;

// const Earnings = require('../daemons/db/Earnings');

const validate = require('./validation/marketDataRequestValidation.js');
const prepareAnswer = require('./validation/prepareAnswer.js');

const tradierBuffer = require('./buffer/tradierBuffer.js');
const yFinanceBuffer = require('./buffer/yFinanceBuffer.js');
const treasuryBuffer = require('./buffer/treasuryBuffer.js');

const optionsCalculation = require('./calculation/optionsCalculation.js');
const noCheckSend = require('./calculation/noCheckSend.js');

const realTimeData = require('./buffer/realTimeData.js');

router.post('/quote', validate.validateTicker, prepareAnswer, tradierBuffer.getQuotes, yFinanceBuffer.getQuote, noCheckSend('quote'));

router.post('/chain', validate.validateTicker, prepareAnswer, tradierBuffer.getQuotes, yFinanceBuffer.getQuote, treasuryBuffer.getYieldCurve, tradierBuffer.getChainExpiries, noCheckSend('chain'));

router.post('/optionsQuote', validate.validateTicker, prepareAnswer, tradierBuffer.getQuotes, yFinanceBuffer.getQuote, treasuryBuffer.getYieldCurve, tradierBuffer.getChainExpiries, optionsCalculation.getOptionsQuote, noCheckSend('optionsQuote'));

router.post('/historical', validate.validateTicker, validate.validateDays, prepareAnswer, tradierBuffer.getHistoricalData, noCheckSend('historical'));

router.post('/iv', validate.validateTicker, validate.validateDays, validate.validateIVLength, prepareAnswer, tradierBuffer.getHistoricalData, tradierBuffer.getHistoricalIV, optionsCalculation.getHistoricalIV, noCheckSend('historicalIV'));

router.post('/guessSymbol', validate.validateText, prepareAnswer, tradierBuffer.guessSymbol, noCheckSend('guesses'));

router.post('/yields', prepareAnswer, treasuryBuffer.getYieldCurve, noCheckSend('yields'));

router.post('/ivDeprecated', validate.validateTicker, validate.validateIVLength, (req, res) => {
  realTimeData.getIV(tradikey, req.body.ticker, req.body.length, (data) => {
    res.json(data);
  });
});

module.exports = router;
