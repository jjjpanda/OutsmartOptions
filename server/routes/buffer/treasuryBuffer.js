const request = require('request');
const moment = require('moment');
const convert = require('xml-js');

const appendLogs = require('../../logs/appendLogs.js');

module.exports = {

  getYieldCurve(req, res, next) {
    const d = moment();
    let i = 5; // 5 tries max
    const looper = () => {
      while (!d.isoWeekday()) {
        d.subtract(1, 'days');
      }
      const year = d.year();
      const month = d.month() + 1;
      const date = d.date();
      request({
        method: 'get',
        url: `https://data.treasury.gov/feed.svc/DailyTreasuryYieldCurveRateData?$filter=month(NEW_DATE)%20eq%20${month}%20and%20year(NEW_DATE)%20eq%20${year}and%20day(NEW_DATE)%20eq%20${date}`,
      }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          let data;
          try {
            data = (convert.xml2json(body));
            data = JSON.parse(data).elements[0].elements[4].elements[6].elements[0].elements.slice(2, 14).map((k) => ({ name: k.name, val: parseFloat(k.elements[0].text) }));
          } catch (error) {
            // appendLogs('./server/logs/logs.txt', error);
            data = [];
          }
          if (i > 0 && data.length == 0) {
            d.subtract(1, 'days');
            i--;
            looper();
          } else {
            req.body.answer.yields = data;
            next();
          }
        } else {
          res.status(400).json({ error: true, details: 'Data Formatting Error from getYieldCurve in treasuryBuffer' });
        }
      });
    };
    looper();
  },

};
