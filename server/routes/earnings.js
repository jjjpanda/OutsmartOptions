const express = require('express');

const router = express.Router();

const Earnings = require('../db/models/Earnings');

const realTimeData = require('../js/realTimeData.js');

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

router.post('/earningsDate', (req, res) => {
  const {ticker} = req.body;
  realTimeData.getEarnings(ticker, (data) => {
    res.json(data);
  });
})

module.exports = router;
