const express = require('express');

const router = express.Router();

const env = require('dotenv').config();

const tradikey = process.env.tradier;
const alphakey = process.env.alpha;

//const Earnings = require('../daemons/db/Earnings');

const validate = require('./validation/marketDataRequestValidation.js')
const prepare = require('./validation/prepareAnswer.js')

const tradierBuffer = require('./buffer/tradierBuffer.js')
const yFinanceBuffer = require('./buffer/yFinanceBuffer.js')
const treasuryBuffer = require('./buffer/treasuryBuffer.js')

const optionsQuote = require('./calculation/optionsQuote.js')
const noCheckSend = require('./calculation/noCheckSend.js')

const realTimeData = require('./buffer/realTimeData.js');

router.post('/price', validate.validateTicker, prepare, tradierBuffer.getQuotes, yFinanceBuffer.getQuote, noCheckSend("quote"));

router.post('/chain', validate.validateTicker, prepare, tradierBuffer.getQuotes, yFinanceBuffer.getQuote, treasuryBuffer.getYieldCurve, tradierBuffer.getChainExpiries, noCheckSend("chain"));

router.post('/optionsQuote', validate.validateTicker, prepare, tradierBuffer.getQuotes, yFinanceBuffer.getQuote, treasuryBuffer.getYieldCurve, tradierBuffer.getChainExpiries, optionsQuote.getOptionsQuote, noCheckSend("optionsQuote"));

router.post('/iv', validate.validateTicker, validate.validateIVLength, (req, res) => {
  realTimeData.getIV(tradikey, req.body.ticker, req.body.length, (data) => {
    res.json(data);
  });
});

router.post('/historical', validate.validateTicker, validate.validateDays, (req, res) => {
  realTimeData.getStockHistoricalData(tradikey, req.body.ticker, req.body.days, (data) => {
    res.json(data);
  });
});

router.post('/guessSymbol', validate.validateText, (req, res) => {
  const { text } = req.body;
  realTimeData.guessSymbol(tradikey, text, (data) => {
    res.json(data);
  });
});

router.post('/yields', prepare, treasuryBuffer.getYieldCurve, noCheckSend("yields"));

/* 
router.post('/earningsSoon', (req, res) => {
  const { ticker } = req.body;
  Earnings.findOne({ company: ticker }).then((earnings) => {
    if (earnings) {
      res.json({ date: earnings.date, erSoon: true });
    } else {
      res.json({ erSoon: false });
    }
  });
});

router.post('/divYield', validate.validateTicker, (req, res) => {
  realTimeData.getDividend(alphakey, req.body.ticker, (data) => {
    res.json(data);
  });
});

router.post('/earningsDate', validate.validateTicker, (req, res) => {
  realTimeData.getEarnings(req.body.ticker, (data) => {
    res.json(data);
  });
});
*/

module.exports = router;
