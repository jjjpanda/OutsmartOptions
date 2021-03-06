const Option = require('../../daemons/models/Option.js');

module.exports = {

  strategyFormatCheck(req, res, next) {
    if (req.body.legs == undefined) {
      res.status(400).json({ error: true, details: 'Validation Error from strategyFormatCheck in strategyFormatCheck', errors: 'Badly Formatted Strategies, Nonexistent' });
    } else if (!(req.body.legs instanceof Array)) {
      res.status(400).json({ error: true, details: 'Validation Error from strategyFormatCheck in strategyFormatCheck', errors: 'Badly Formatted Strategies, Not Array' });
    } else {
      for (let strat of req.body.legs) {
        if (strat instanceof Object) {
          if (strat.date == undefined || strat.strike == undefined || strat.cost == undefined || strat.isCall == undefined || strat.isLong == undefined || strat.symbol == undefined) {
            res.status(400).json({ error: true, details: 'Validation Error from strategyFormatCheck in strategyFormatCheck', errors: 'Badly Formatted Strategies, Options Missing Information' });
            return;
          }

          strat = new Option(strat.date, strat.strike, strat.cost, strat.isCall, strat.isLong, strat.symbol);
        } else {
          res.status(400).json({ error: true, details: 'Validation Error from strategyFormatCheck in strategyFormatCheck', errors: 'Badly Formatted Strategies, Not an Object' });
        }
      }
      next();
    }
  },

  strategySorting(req, res, next) {
    req.body.legs = req.body.legs.sort((a, b) => Option.compare(a, b));
    next();
  },

  strategyNameCheck(req, res, next) {
    if (req.body.name != undefined && req.body.name.length >= 0) {
      next();
    } else {
      res.status(400).json({ error: true, details: 'Validation Error, no Name' });
    }
  },

};
