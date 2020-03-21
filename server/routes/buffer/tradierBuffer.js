const request = require('request');
const moment = require('moment')

const appendLogs = require('../../logs/appendLogs.js');

const { mathematique } = require("que-series")

console.log("If this: "+ require('que-series').mathematique.options.loss(1, 0) + " is 1, you're good.")

const env = require('dotenv').config();
const apikey = process.env.tradier;

module.exports = {

    getQuotes(req, res, next){
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
            let quotes = JSON.parse(body).quotes;
            if(!("quote" in quotes)){
              quotes['quote'] = {}
            }
            if (quotes != null) {
              const found = !("unmatched_symbols" in quotes);
              const price = quotes.quote.last;
              const change = quotes.quote.change_percentage;
              const name = quotes.quote.description;
              const average_volume = quotes.quote.average_volume;
              const volume = quotes.quote.volume;
              req.body.answer.quote = { found, price, change, name, average_volume, volume };
              next()
            }
          } else {
            res.json({ error: true, details: "Data Formatting Error" });
          }
      });
    },

    getChainExpiries(req, res, next){
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
        if(!error && response.statusCode == 200 && req.body.answer.quote.found){
          let {expirations} = JSON.parse(body)
          if(expirations == null){
            res.json({ error: true, details: "No Options Expiries" })
          }
          else{
            //req.body.answer = expirations;
            const numberOfExpiries = expirations.date.length
            const optionsChain = []
            let i = 0;
            function looper(data, index){
              optionsChain.splice(index, 0, [expirations.date[i], data])
              i++;
              if (i >= numberOfExpiries){
                req.body.answer.chain = optionsChain;
                next()
              }
              else{
                getChainOfExpiry(req.body.ticker, expirations.date[i], req.body.answer, looper, i)
              }
            }
            getChainOfExpiry(req.body.ticker, expirations.date[i], req.body.answer, looper, i)
          }
        }
        else{
          res.json({ error: true, details: "Data Formatting Error" })
        }
        });
    },

}

const getChainOfExpiry = (ticker, expiration, answer, callback, i=0) => {
  let underlying = answer.quote.price
  let yields = answer.yields
  let divYield = answer.quote.divYield
  let t = moment(expiration).diff(moment(), 'days')/365
  let rfir = mathematique.treasury.getRightYield(yields, t)
  request({
    method: 'get',
    url: 'https://sandbox.tradier.com/v1/markets/options/chains',
    qs: {
      symbol: ticker,
      expiration: expiration,
      greeks: true
    },
    headers: {
      Authorization: `Bearer ${apikey}`,
      Accept: 'application/json',
    },
  }, (error, response, body) => {
    // appendLogs('./server/logs/logs.txt', response.statusCode);
    if (!error && response.statusCode == 200) {
      let {options} = JSON.parse(body);
      if (options != null && options.option != undefined) {
        options = options.option;

        const newData = [];
        const strikes = [];
        let mid
        for (const option of options) {
          mid = parseFloat(((option.bid + option.ask) / 2).toFixed(2))
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
            let found = newData.find((x) => x.strike === option.strike)
            found[`${option.option_type}Bid`] = option.bid;
            found[option.option_type] = mid;
            found[`${option.option_type}Ask`] = option.ask;
            found[`${option.option_type}Vol`] = option.volume;
            found[`${option.option_type}OI`] = option.open_interest;
            found[`${option.option_type}Symbol`] = option.symbol;
            found[`${option.option_type}IV`] = mathematique.options.calculateIV(t, mid, underlying, option.strike, option.option_type == 'call', rfir, divYield);
            found[`${option.option_type}Greeks`] = option.greeks
          }
        }

        // CHANGED DATA TO NEWDATA
        callback(newData.sort((a, b) => a.strike - b.strike), i);

      }
      else{
        callback([], i);
      }
    } else {
      callback([], i);
    }
  });
}