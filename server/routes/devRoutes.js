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
}

module.exports = router;
