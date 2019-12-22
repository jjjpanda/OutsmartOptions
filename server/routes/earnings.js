const express = require('express');

const router = express.Router();

const Earnings = require('../db/models/Earnings');

router.post('/earningsDate', (req, res) => {
  const { ticker } = req.body;
  Earnings.findOne({ company: ticker }).then((earnings) => {
    if (earnings) {
      res.json({ date: earnings.date, erSoon: true });
    } else {
      res.json({ erSoon: false });
    }
  });
});

module.exports = router;
