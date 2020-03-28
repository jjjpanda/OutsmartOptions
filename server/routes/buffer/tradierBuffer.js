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
        res.status(400).json({ error: true, details: 'Data Formatting Error from getQuotes in tradierBuffer' });
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
          req.body.answer.historical = historical instanceof Array ? historical : [historical];
          next();
        } else {
          res.status(400).json({ error: true, details: 'Data Formatting Error from getHistoricalData in tradierBuffer' });
        }
      } else {
        res.status(400).json({ error: true, details: 'Data Formatting Error from getHistoricalData in tradierBuffer' });
      }
    });
  },

  getHistoricalIV(req, res, next) {
    let editCount = 0
    let lastDay = req.body.answer.historical[req.body.answer.historical.length - 1]
    for(let i = 0; i < req.body.length; i++){
      req.body.answer.historical.push({
        date: moment(lastDay.date).add(i+1, 'days').format('YYYY-MM-DD'),
        close: lastDay.close
      })
    };
    req.body.answer.historical.forEach((date, index) => {
      date.underlying = req.body.answer.historical[(index - req.body.length >= 0) ? (index - req.body.length) : 0].close
      let strikeRounding = [0.5, 1, 2, 2.5, 5, 10, 20, 50, 100];
      let roundIndex = 0
      let looper = (roundNumber) => {
        date.strike = Math.ceil(date.underlying / roundNumber) * roundNumber
        date.symbol = `${req.body.ticker}${moment(date.date).format('YYMMDD')}P${(`00000000${date.strike * 1000}`).slice(-8)}`
        let r = { 'body': {
          'ticker': date.symbol,
          'days': parseInt(moment().diff(moment(date.date), 'days'))+parseInt(req.body.length), 
          'answer': date 
        }}
        let s = {status: (n) => {
          return s
        },
        json : (o) => {
          roundIndex++
          if(roundIndex < strikeRounding.length){
            looper(strikeRounding[roundIndex]) 
          }
          else {
            
            editCount++
            if(editCount >= req.body.answer.historical.length){
              next()
            }
          }
        }}
        module.exports.getHistoricalData(r, s, () => {
          editCount++
          if(editCount >= req.body.answer.historical.length){
            next()
          }
        })
      }
      looper(strikeRounding[roundIndex])
    })
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
          res.status(400).json({ error: true, details: 'Data Formatting Error from guessSymbol in tradierBuffer' });
        }
      } else {
        res.status(400).json({ error: true, details: 'Data Formatting Error from guessSymbol in tradierBuffer' });
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
          res.status(400).json({ error: true, details: 'No Options Expiries from getChainExpiries in tradierBuffer' });
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
        res.status(400).json({ error: true, details: 'Data Formatting Error from getChainExpiries in tradierBuffer' });
      }
    });
  },

};

const getChainOfExpiry = (ticker, expiration, answer, callback, i = 0) => {
  const underlying = answer.quote.price;
  const { yields } = answer;
  const { divYield } = answer.quote;
  const t = moment(expiration).diff(moment(), 'hours') / (365*24);
  const rfir = mathematique.treasury.getRightYield(yields, t * 365);
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
        let newData = [];
        const strikes = [];
        let mid;
        let iv;
        for (const option of options) {
          mid = parseFloat(((option.bid + option.ask) / 2).toFixed(2));

          iv = mathematique.options.calculateIV(t, mid, underlying, option.strike, option.option_type == 'call', rfir, divYield)
          if(isNaN(iv)){
            iv = option.greeks.mid_iv
            if(iv == 0){
              iv = 0.01
            }
          }
          
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
              [`${option.option_type}IV`]: iv,
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
            found[`${option.option_type}IV`] = iv;
            found[`${option.option_type}Greeks`] = option.greeks;
          }
        }

        newData = newData.sort((a, b) => a.strike - b.strike)

        const outliers = mathematique.stats
        
        const callVolSum = newData.reduce((a, b) => a + b.callVol, 0);
        const putVolSum = newData.reduce((a, b) => a + b.putVol, 0);
        const callDist = outliers.setDistribution(newData.map((x) => x.strike), newData.map((x) => x.callVol));
        const putDist = outliers.setDistribution(newData.map((x) => x.strike), newData.map((x) => x.putVol));
        const callVolMean = outliers.getMean(callDist);
        const putVolMean = outliers.getMean(putDist);
        const callVolStd = outliers.getSD(callDist);
        const putVolStd = outliers.getSD(putDist);
        
        newData.map((y, index) => {
          y.atmNess = newData[index + 1] != undefined ? ((newData[index].strike <= underlying && newData[index + 1].strike > underlying) ? 'atmStrike' : '') : '';
          y.callOutlier = outliers.isOutlier(y.callVol, callVolSum, y.strike, callVolMean, callVolStd);
          y.putOutlier = outliers.isOutlier(y.putVol, putVolSum, y.strike, putVolMean, putVolStd);
          return y;
        })

        // CHANGED DATA TO NEWDATA
        callback(newData, i);
      } else {
        callback([], i);
      }
    } else {
      callback([], i);
    }
  });
  
};
