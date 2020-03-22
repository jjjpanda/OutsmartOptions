const request = require('request');

module.exports = {
  getTweets(apikey, q, callback) {
    request({
      method: 'get',
      url: 'https://api.twitter.com/1.1/search/tweets.json',
      qs: {
        q,
      },
      headers: {
        Authorization: `Bearer ${apikey}`,
        Accept: 'application/json',
      },
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const tweets = JSON.parse(body).statuses;
        if (tweets != undefined) {
          callback({ tweets });
        } else {
          callback({ tweets: false });
        }
      } else {
        callback({ error, response: response.statusCode });
      }
    });
  },
};
