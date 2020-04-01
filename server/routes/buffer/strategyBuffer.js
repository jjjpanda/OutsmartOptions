const Strategy = require('../../daemons/models/Strategy');
const User = require('../../daemons/models/User');

module.exports = {
    loadStrategy(req, res, next){
        User.findById(req.body.id).then((user) => {
            if (user) {
              if (req.body.ticker != undefined && req.body.ticker != "") {
                Strategy.find({ user, ticker: req.body.ticker }).then((strategies) => {
                  if (strategies) {
                    res.json({ strategies: strategies.map(strat => { return {ticker: strat.ticker, legs: strat.legs} }) });
                  } else {
                    res.json({ strategies: [] });
                  }
                });
              } else {
                Strategy.find({ user }).then((strategies) => {
                  if (strategies) {
                    res.json({ strategies: strategies.map(strat => { return {ticker: strat.ticker, legs: strat.legs} }) });
                  } else {
                    res.json({ strategies: [] });
                  }
                });
              }
            } else {
                res.status(400).json({ error: true, details: "Buffer Error from loadStrategy in strategyBuffer" });
            }
        });
    },

    saveStrategy(req, res, next) {
        User.findById(req.body.id).then((user) => {
          if (user) {
            Strategy.findOne({ user, ticker: req.body.ticker, key: req.body.legs.reduce((key, leg) => key + `${leg.symbol}${leg.quantity}${leg.isLong ? "LONG" : "SHORT"}`, "") }).then((strategy) => {
                if (strategy) {
                    res.status(400).json({ error: true, details: "Buffer Error from saveStrategy in strategyBuffer", errors: 'Strategy already exists' });
                } else {
                    const newStrat = new Strategy({ user, ticker: req.body.ticker, legs: req.body.legs, key: req.body.legs.reduce((key, leg) => key + `${leg.symbol}${leg.quantity}${leg.isLong ? "LONG" : "SHORT"}`, "") });
                    newStrat.save().then(() => {
                        res.json({ saved: true });
                    });
                }
            });
          } else {
            res.status(400).json({ error: true, details: "Buffer Error from saveStrategy in strategyBuffer" });
          }
        });
    },

    deleteStrategy(req, res) {
        User.findById(req.body.id).then((user) => {
          if (user) {
            Strategy.deleteOne({ user, ticker: req.body.ticker, key: req.body.legs.reduce((key, leg) => key + `${leg.symbol}${leg.quantity}${leg.isLong ? "LONG" : "SHORT"}`, "") }).then((e) => {
              if (e.deletedCount == 1) {
                res.json({ deleted: true });
              } else {
                res.status(400).json({ error: true, details: "Buffer Error from deleteStrategy in strategyBuffer", errors: e });
              }
            });
          } else {
            res.status(400).json({ error: true, details: "Buffer Error from deleteStrategy in strategyBuffer" });
          }
        });
    }
}