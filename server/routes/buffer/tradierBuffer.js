const request = require('request');
const moment = require('moment');

const appendLogs = require('../../logs/appendLogs.js');

const { mathematique } = require('que-series');

appendLogs('./server/logs/logs.txt', `If this: ${require('que-series').mathematique.options.loss(1, 0)} is 1, you're good.`);

const env = require('dotenv').config();

const apikey = process.env.tradier;

module.exports = {

  getQuotes(req, res, next) {
    request({
      method: 'get',
      url: 'https://sandbox.tradier.com/v1/markets/quotes',
      qs: {
        symbols: req.body.ticker,
      },
      headers: {
        Authorization: `Bearer ${apikey}`,
        Accept: 'application/json',
      },
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const { quotes } = JSON.parse(body);
        if (!('quote' in quotes)) {
          quotes.quote = {};
        }
        if (quotes != null) {
          const found = !('unmatched_symbols' in quotes);
          const price = quotes.quote.last;
          const change = quotes.quote.change_percentage;
          const name = quotes.quote.description;
          const { average_volume } = quotes.quote;
          const { volume } = quotes.quote;
          req.body.answer.quote = {
            found, price, change, name, average_volume, volume,
          };
          next();
        }
      } else {
        res.json({ error: true, details: 'Data Formatting Error' });
      }
    });
  },

  getHistoricalData(req, res, next) {
    request({
      method: 'get',
      url: 'https://sandbox.tradier.com/v1/markets/history',
      qs: {
        symbol: req.body.ticker,
        interval: 'daily',
        start: moment().subtract(req.body.days, 'days').format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD'),
      },
      headers: {
        Authorization: `Bearer ${apikey}`,
        Accept: 'application/json',
      },
    }, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        body = JSON.parse(body);
        if (body != undefined && body.history != undefined && body.history != null) {
          const historical = body.history.day;
          if (historical.length > 1) {
            for (let i = 1; i < historical.length; i++) {
              while (moment(historical[i].date).diff(moment(historical[i - 1].date), 'days') > 1) {
                historical.splice(i, 0, {
                  date: moment(historical[i - 1].date).add(1, 'days').format('YYYY-MM-DD'), open: historical[i - 1].open, high: historical[i - 1].high, low: historical[i - 1].low, close: historical[i - 1].close, volume: 0,
                });
              }
            }
          }
          req.body.answer.historical = historical;
          next();
        } else {
          res.json({ error: true, details: 'Data Formatting Error' });
        }
      } else {
        res.json({ error: true, details: 'Data Formatting Error' });
      }
    });
  },

  getHistoricalIV(req, res, next) {
    const iv = [];
    next();

    /* let iv = []
      let pastExpiries = req.body.answer.historical.filter(d => moment(d.date).day() == 5)
      let index = 0;
      let rounder = [0.5, 1, 2, 2.5, 5, 10, 20, 50, 100];
      let roundIndex = 0;
      let looper = () => {
        if(index >= pastExpiries.length){
          req.body.answer.historicalIV = iv //callback({iv})
        }
        else{
          module.exports.getStockHistoricalData(apikey, `${ticker}${moment(pastExpiries[index].date).format('YYMMDD')}C${('00000000'+Math.ceil(pastExpiries[index].close/rounder[roundIndex])*rounder[roundIndex]*1000).slice(-8)}`, moment().diff(moment(pastExpiries[index].date), 'days')+ivLength, (optionH) => {
              if(optionH[0] != undefined && optionH[0] != null){
                //roundIndex = 0
                iv.push({
                  t: ivLength/365,
                  expiry: moment(pastExpiries[index].date).format('YYYY-MM-DD'),
                  date: moment(pastExpiries[index].date).subtract(ivLength, 'days').format('YYYY-MM-DD'),
                  underlying: pastExpiries[index].close,
                  strike: Math.ceil(pastExpiries[index].close/rounder[roundIndex])*rounder[roundIndex],
                  price: optionH[0].close,
                  symbol: `${ticker}${moment(pastExpiries[index].date).format('YYMMDD')}C${('00000000'+Math.ceil(pastExpiries[index].close/rounder[roundIndex])*rounder[roundIndex]*1000).slice(-8)}`
                })
                index++
                looper()
              }
              else{
                roundIndex++;
                if(roundIndex >= rounder.length){
                  iv.push({
                    t: ivLength/365,
                    expiry: moment(pastExpiries[index].date).format('YYYY-MM-DD'),
                    date: moment(pastExpiries[index].date).subtract(ivLength, 'days').format('YYYY-MM-DD'),
                    underlying: pastExpiries[index].close,
                    strike: Math.ceil(pastExpiries[index].close/rounder[0])*rounder[0],
                    price: 0,
                    symbol: `${ticker}${moment(pastExpiries[index].date).format('YYMMDD')}C${('00000000'+Math.ceil(pastExpiries[index].close/rounder[0])*rounder[0]*1000).slice(-8)}`
                  })
                  index++
                  roundIndex = 0
                  looper()
                }
                else{
                  looper();
                }
              }
          })
        }
      }

      looper() */
  },

  guessSymbol(req, res, next) {
    request({
      method: 'get',
      url: 'https://sandbox.tradier.com/v1/markets/search',
      qs: {
        q: req.body.text,
      },
      headers: {
        Authorization: `Bearer ${apikey}`,
        Accept: 'application/json',
      },
    },
    (error, response, body) => {
      if (!error && response.statusCode == 200) {
        body = JSON.parse(body);
        if (body.securities !== undefined && body.securities !== null && body.securities.security !== null) {
          body = body.securities.security;
          if (body instanceof Array) {
            for (const stock of body) {
              stock.name = stock.description;
              delete stock.description;
            }
            req.body.answer.guesses = body;
          } else {
            body.name = body.description;
            delete body.description;
            req.body.answer.guesses = [body];
          }
          next();
        } else {
          res.json({ error: true, details: 'Data Formatting Error' });
        }
      } else {
        res.json({ error: true, details: 'Data Formatting Error' });
      }
    });
  },

  getChainExpiries(req, res, next) {
    request({
      method: 'get',
      url: 'https://sandbox.tradier.com/v1/markets/options/expirations',
      qs: {
        symbol: req.body.ticker,
        includeAllRoots: true,
        strikes: false,
      },
      headers: {
        Authorization: `Bearer ${apikey}`,
        Accept: 'application/json',
      },
    }, (error, response, body) => {
      if (!error && response.statusCode == 200 && req.body.answer.quote.found) {
        const { expirations } = JSON.parse(body);
        if (expirations == null) {
          res.json({ error: true, details: 'No Options Expiries' });
        } else {
          // req.body.answer = expirations;
          const numberOfExpiries = expirations.date.length;
          const optionsChain = [];
          function looper(data, index) {
            optionsChain.splice(index, 0, [expirations.date[index], data]);
            if (optionsChain.length >= numberOfExpiries) {
              optionsChain.sort((a, b) => moment(a[0]).diff(b[0]));
              req.body.answer.chain = optionsChain;
              next();
            }
          }
          for (let j = 0; j < numberOfExpiries; j++) {
            getChainOfExpiry(req.body.ticker, expirations.date[j], req.body.answer, looper, j);
          }
        }
      } else {
        res.json({ error: true, details: 'Data Formatting Error' });
      }
    });
  },

};

const getChainOfExpiry = (ticker, expiration, answer, callback, i = 0) => {
  const underlying = answer.quote.price;
  const { yields } = answer;
  const { divYield } = answer.quote;
  const t = moment(expiration).diff(moment(), 'days') / 365;
  const rfir = mathematique.treasury.getRightYield(yields, t);
  request({
    method: 'get',
    url: 'https://sandbox.tradier.com/v1/markets/options/chains',
    qs: {
      symbol: ticker,
      expiration,
      greeks: true,
    },
    headers: {
      Authorization: `Bearer ${apikey}`,
      Accept: 'application/json',
    },
  }, (error, response, body) => {
    // appendLogs('./server/logs/logs.txt', response.statusCode);
    if (!error && response.statusCode == 200) {
      let { options } = JSON.parse(body);
      if (options != null && options.option != undefined) {
        options = options.option;
        const newData = [];
        const strikes = [];
        let mid;
        for (const option of options) {
          mid = parseFloat(((option.bid + option.ask) / 2).toFixed(2));

          if (!strikes.includes(option.strike)) {
            strikes.push(option.strike);
            newData.push({
              strike: option.strike,
              [`${option.option_type}Bid`]: option.bid,
              [option.option_type]: mid,
              [`${option.option_type}Ask`]: option.ask,
              [`${option.option_type}Vol`]: option.volume,
              [`${option.option_type}OI`]: option.open_interest,
              [`${option.option_type}Symbol`]: option.symbol,
              [`${option.option_type}IV`]: mathematique.options.calculateIV(t, mid, underlying, option.strike, option.option_type == 'call', rfir, divYield),
              [`${option.option_type}Greeks`]: option.greeks,
              key: expiration + option.strike,
            });
          } else {
            const found = newData.find((x) => x.strike === option.strike);
            found[`${option.option_type}Bid`] = option.bid;
            found[option.option_type] = mid;
            found[`${option.option_type}Ask`] = option.ask;
            found[`${option.option_type}Vol`] = option.volume;
            found[`${option.option_type}OI`] = option.open_interest;
            found[`${option.option_type}Symbol`] = option.symbol;
            found[`${option.option_type}IV`] = mathematique.options.calculateIV(t, mid, underlying, option.strike, option.option_type == 'call', rfir, divYield);
            found[`${option.option_type}Greeks`] = option.greeks;
          }
        }

        // CHANGED DATA TO NEWDATA
        callback(newData.sort((a, b) => a.strike - b.strike), i);
      } else {
        callback([], i);
      }
    } else {
      callback([], i);
    }
  });
};
