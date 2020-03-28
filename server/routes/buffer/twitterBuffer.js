const request = require('request');
const env = require('dotenv').config();
const twitterKey = process.env.twitterKey

module.exports = {

  getTweets(req, res, next){
    request({
      method: 'get',
      url: 'https://api.twitter.com/1.1/search/tweets.json',
      qs: {
        q: req.body.q,
      },
      headers: {
        Authorization: `Bearer ${twitterKey}`,
        Accept: 'application/json',
      },
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const tweets = JSON.parse(body).statuses;
        if (tweets != undefined) {
          req.body.answer = { tweets };
        } else {
          req.body.answer = { tweets: false };
        }
        next()
      } else {
        res.status(400).json({ error: true, details: "Data Formatting Error from getTweets in twitterBuffer" });
      }
    });
  }
};
