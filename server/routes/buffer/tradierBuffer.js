const request = require('request');
const moment = require('moment')

const appendLogs = require('../../logs/appendLogs.js');

const treasuryBuffer = require('./treasuryBuffer.js')

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
              req.body.answer = { found, price, change, name, average_volume, volume };
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
        if(!error && response.statusCode == 200){
          let res = {body: {}}
          treasuryBuffer.getYieldCurve(res, "", () => {
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
                  req.body.answer = optionsChain;
                  next()
                }
                else{
                  getChainOfExpiry(req.body.ticker, expirations.date[i], looper, i)
                }
              }
              getChainOfExpiry(req.body.ticker, expirations.date[i], looper, i)
            }
          })
        }
        else{
          res.json({ error: true, details: "Data Formatting Error" })
        }
        });
    },

}

const getChainOfExpiry = (ticker, expiration, callback, i=0) => {
  request({
    method: 'get',
    url: 'https://sandbox.tradier.com/v1/markets/options/chains',
    qs: {
      symbol: ticker,
      expiration: expiration,
    },
    headers: {
      Authorization: `Bearer ${apikey}`,
      Accept: 'application/json',
    },
  }, (error, response, body) => {
    // appendLogs('./server/logs/logs.txt', response.statusCode);
    if (!error && response.statusCode == 200) {
      let {options} = JSON.parse(body);
      let data;
      if (options != null && options.option != undefined) {

        options = options.option;
        data = options.map((a) => ({
          type: a.option_type,
          strike: a.strike,
          bid: a.bid,
          ask: a.ask,
          vol: a.volume,
          // avol: a.average_volume,
          oi: a.open_interest,
          symbol: a.symbol,
        }));
      
        // REFACTOR
        const newData = [];
        const strikes = [];
        for (const option of data) {
          if (!strikes.includes(option.strike)) {
            strikes.push(option.strike);
            newData.push({
              strike: option.strike,
              [`${option.type}Bid`]: option.bid,
              [option.type]: parseFloat(((option.bid + option.ask) / 2).toFixed(2)),
              [`${option.type}Ask`]: option.ask,
              [`${option.type}Vol`]: option.vol,
              // [option.type+"AvgVol"]:option.avol,
              [`${option.type}OI`]: option.oi,
              [`${option.type}Symbol`]: option.symbol,
              key: expiration + option.strike,
            });
          } else {
            newData.find((x) => x.strike === option.strike)[`${option.type}Bid`] = option.bid;
            newData.find((x) => x.strike === option.strike)[option.type] = ((option.bid + option.ask) / 2).toFixed(2);
            newData.find((x) => x.strike === option.strike)[`${option.type}Ask`] = option.ask;
            newData.find((x) => x.strike === option.strike)[`${option.type}Vol`] = option.vol;
            // newData.find(x => x.strike === option.strike)[option.type+"AvgVol"] = option.avol
            newData.find((x) => x.strike === option.strike)[`${option.type}OI`] = option.oi;
            newData.find((x) => x.strike === option.strike)[`${option.type}Symbol`] = option.symbol;
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