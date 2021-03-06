const { mathematique } = require('que-series');
const moment = require('moment');

module.exports = {

  getOptionsQuote(req, res, next) {
    req.body.answer.optionsQuote = {
      callOI: 0, putOI: 0, putIVArray: [], putIV: 0, callVol: 0, putVol: 0, callIVArray: [], callIV: 0, pcRatioOI: 1, pcRatioVol: 1,
    };
    for (const [date, strikes] of req.body.answer.chain) {
      req.body.answer.optionsQuote.callIVArray.push([date, 0]);
      req.body.answer.optionsQuote.putIVArray.push([date, 0]);
      for (const option of strikes) {
        req.body.answer.optionsQuote.callOI += option.callOI;
        req.body.answer.optionsQuote.putOI += option.putOI;

        req.body.answer.optionsQuote.callVol += option.callVol;
        req.body.answer.optionsQuote.putVol += option.putVol;

        req.body.answer.optionsQuote.callIVArray[req.body.answer.optionsQuote.callIVArray.length - 1][1] += option.callIV == null || isNaN(option.callIV) ? 0 : option.callIV;
        req.body.answer.optionsQuote.putIVArray[req.body.answer.optionsQuote.putIVArray.length - 1][1] += option.putIV == null || isNaN(option.putIV) ? 0 : option.putIV;
      }
      req.body.answer.optionsQuote.callIVArray[req.body.answer.optionsQuote.callIVArray.length - 1][1] /= strikes.length;
      req.body.answer.optionsQuote.putIVArray[req.body.answer.optionsQuote.putIVArray.length - 1][1] /= strikes.length;

      req.body.answer.optionsQuote.callIV = req.body.answer.optionsQuote.callIVArray.reduce((acc, c) => acc + (c[1] == null || !isFinite(c[1]) || isNaN(c[1]) ? 0 : c[1]), 0);
      req.body.answer.optionsQuote.callIV /= strikes.length;
      req.body.answer.optionsQuote.putIV = req.body.answer.optionsQuote.putIVArray.reduce((acc, c) => acc + (c[1] == null || !isFinite(c[1]) || isNaN(c[1]) ? 0 : c[1]), 0);
      req.body.answer.optionsQuote.putIV /= strikes.length;

      req.body.answer.optionsQuote.pcRatioOI = req.body.answer.optionsQuote.putOI / req.body.answer.optionsQuote.callOI;
      req.body.answer.optionsQuote.pcRatioVol = req.body.answer.optionsQuote.putVol / req.body.answer.optionsQuote.callVol;
    }
    next();
  },

  getHistoricalIV(req, res, next) {
    let historicalIV = req.body.answer.historical.filter((a) => a.historical).map((d) => ({
      date: d.historical[0].date,
      underlying: d.underlying,
      strike: d.strike,
      price: d.historical[0].close,
      symbol: d.symbol,
      iv: mathematique.options.calculateIV(moment(d.date).diff(moment(d.historical[0].date), 'hours') / (365 * 24), d.historical[0].close, d.underlying, d.strike, false, 0, 0),
    }));

    historicalIV = historicalIV.sort((a, b) => moment(a.date).diff(moment(b.date), 'days'));

    req.body.answer.historicalIV = historicalIV;
    next();
  },

};
