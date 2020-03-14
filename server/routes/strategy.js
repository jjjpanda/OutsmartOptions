const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('./validation/authorizeUser')(jwt);
const env = require('dotenv').config();

const secretOrKey = process.env.SECRETKEY;

const Strategy = require('../daemons/db/Strategy');
const User = require('../daemons/db/User');

const strategyFormatCheck = (req, res, next) => {
  if (!(req.body.strategy instanceof Array)) {
    res.json({ error: true, details: 'Badly Formatted Strategies, Not Array' });
    return;
  }
  for (const strat of req.body.strategy) {
    if (!(strat instanceof Object)) {
      res.json({ error: true, details: 'Badly Formatted Strategies, Not Array of Objects' });
      return;
    }
  }
  next();
};

router.post('/load', auth, (req, res) => {
  User.findById(req.body.id).then((user) => {
    if (user) {
      if (req.body.ticker != undefined) {
        Strategy.find({ user, stock: req.body.ticker }).then((strategies) => {
          if (strategies) {
            res.json({ strategies });
          } else {
            res.json({ strategy: false });
          }
        });
      } else {
        Strategy.find({ user }).then((strategies) => {
          if (strategies) {
            res.json({ strategies });
          } else {
            res.json({ strategy: false });
          }
        });
      }
    } else {
      res.json({ user: 'not found' });
    }
  });
});

router.post('/delete', auth, strategyFormatCheck, (req, res) => {
  const searchQuery = {};
  for (let i = 0; i < req.body.strategy.length; i++) {
    searchQuery[`legs.${i}.date`] = req.body.strategy[i].date;
    searchQuery[`legs.${i}.strike`] = req.body.strategy[i].strike;
    searchQuery[`legs.${i}.price`] = req.body.strategy[i].price;
    searchQuery[`legs.${i}.isCall`] = req.body.strategy[i].isCall;
    searchQuery[`legs.${i}.isLong`] = req.body.strategy[i].isLong;
    searchQuery[`legs.${i}.quantity`] = req.body.strategy[i].quantity;
  }
  User.findById(req.body.id).then((user) => {
    if (user) {
      Strategy.deleteOne({ user, stock: req.body.ticker, ...searchQuery }).then((e) => {
        if (e.deletedCount == 1) {
          res.json({ error: false, details: e });
        } else {
          res.json({ error: true, details: e });
        }
      });
    } else {
      res.json({ user: 'not found' });
    }
  });
});

router.post('/save', auth, strategyFormatCheck, (req, res) => {
  User.findById(req.body.id).then((user) => {
    if (user) {
      Strategy.findOne({ user, legs: req.body.strategy }).then((strategy) => {
        if (strategy) {
          res.json({ error: true, details: 'Strategy already exists' });
        } else {
          const newStrat = new Strategy({ user, stock: req.body.ticker, legs: req.body.strategy });
          newStrat.save().then(() => {
            res.json({ strategy: true });
          });
        }
      });
    } else {
      res.json({ user: 'not found' });
    }
  });
});

module.exports = router;
