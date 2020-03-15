const express = require('express');

const router = express.Router();

const env = require('dotenv').config();

const tradikey = process.env.tradier;
const alphakey = process.env.alpha;

//const Earnings = require('../daemons/db/Earnings');

const validate = require('./validation/marketDataRequestValidation.js')

const realTimeData = require('./buffer/realTimeData.js');
const treasuryXML = require('./buffer/treasuryXMLConvert.js');

router.post('/price', validate.validateTicker, (req, res) => {
  realTimeData.getData(tradikey, req.body.ticker, (data) => {
    res.json(data);
  });
});

router.post('/chain', validate.validateTicker, (req, res) => {
  realTimeData.getExpiries(tradikey, req.body.ticker, (data) => {
    res.json(data);
  });
});

router.post('/optionsQuote', validate.validateTicker, (req, res) => {
  realTimeData.getOptionsQuote(tradikey, req.body.ticker, (data) => {
    res.json(data);
  });
})

router.post('/iv', (req, res) => {
  const { ticker, length } = req.body;
  realTimeData.getIV(tradikey, ticker, (length === undefined ? 30 : length), (data) => {
    res.json(data);
  });
});

router.post('/historical', (req, res) => {
  const { ticker, days } = req.body;
  realTimeData.getStockHistoricalData(tradikey, ticker, (days === undefined ? 720 : days), (data) => {
    res.json(data);
  });
});

router.post('/guessSymbol', (req, res) => {
  const { text } = req.body;
  realTimeData.guessSymbol(tradikey, text, (data) => {
    res.json(data);
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

router.post('/treasury', (req, res) => {
  treasuryXML.getYield((data) => {
    res.json(data);
  });
});

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
*/

module.exports = router;
