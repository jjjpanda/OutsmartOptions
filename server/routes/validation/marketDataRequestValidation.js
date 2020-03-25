module.exports = {

  validateTicker(req, res, next) {
    const { ticker } = req.body;
    if (ticker == undefined) {
      res.json({ error: true, details: 'Validation Error from validateTicker in marketDataRequestValidation' });
    } else {
      req.body.ticker = ticker.toUpperCase()
      next();
    }
  },

  validateIVLength(req, res, next) {
    const { length } = req.body;
    if (length == undefined) {
      req.body.length = 30;
    }
    next();
  },

  validateDays(req, res, next) {
    const { days } = req.body;
    if (days == undefined) {
      req.body.days = 720;
    }
    next();
  },

  validateText(req, res, next) {
    const { text } = req.body;
    if (text == undefined) {
      res.json({ error: true, details: 'Validation Error from validateText in marketDataRequestValidation' });
    } else {
      next();
    }
  },

};
