const express = require('express');

const router = express.Router();

const path = require('path');
const env = require('dotenv').config();

router.post('/logs', function (req, res) {
  if(req.body.token === process.env.devRouteToken){
    res.sendFile(path.join(__dirname, '../logs/logs.txt'))
  }
  else{
    res.sendStatus(401);
  }
});

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
