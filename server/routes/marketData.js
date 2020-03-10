const express = require('express');

const router = express.Router();

const env = require('dotenv').config();

const tradikey = process.env.tradier;
const alphakey = process.env.alpha;

const realTimeData = require('../js/realTimeData.js');

router.post('/price', (req, res) => {
  const { ticker } = req.body;
  // res.json({"test": "test"});
  realTimeData.getData(tradikey, ticker, (data) => {
    res.json(data);
  });
});

router.post('/chain', (req, res) => {
  const { ticker } = req.body;
  realTimeData.getExpiries(tradikey, ticker, (data) => {
    res.json(data);
  });
});

router.post('/optionsQuote', (req, res) => {
  const { ticker } = req.body;
  realTimeData.getOptionsQuote(tradikey, ticker, (data) => {
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
  realTimeData.guessSymbol(alphakey, text, (data) => {
    res.json(data);
  });
});

router.post('/divYield', (req, res) => {
  const { ticker } = req.body;
  realTimeData.getDividend(alphakey, ticker, (data) => {
    res.json(data);
  });
});

module.exports = router;
