const express = require('express');

const router = express.Router();

const env = require('dotenv').config();

if (process.env.NODE_ENV === 'development') {
  router.use('/coverage', express.static('./coverage/lcov-report', {
    index: 'index.html',
  }));

  router.use('/lint', express.static('./eslint', {
    index: 'lintOutput.html',
  }));

  router.use('/jest', express.static('./test/report', {
    index: 'index.html',
  }));
}

else{
  router.use('/coverage', (req, res) => res.status(404).send("You're a dev?"));

  router.use('/lint', (req, res) => res.status(404).send("You're a dev?"));
  
  router.use('/jest', (req, res) => res.status(404).send("You're a dev?"));
}

module.exports = router;
