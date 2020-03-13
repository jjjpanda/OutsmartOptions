const express = require('express');

const router = express.Router();

const env = require('dotenv').config();

const twitterSearchData = require('../buffer/twitterSearchData.js');

router.post('/search', (req, res) => {
  const { q } = req.body;
  twitterSearchData.getTweets(process.env.twitterKey, q, (data) => {
    res.json(data);
  });
});

module.exports = router;
