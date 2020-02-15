const request = require('request');

const appendLogs = require('../logs/appendLogs.js')

module.exports = {

  sendCalcError(url, msg, callback) {
    // appendLogs('./server/logs/logs.txt', JSON.stringify({"content": JSON.stringify({"report": msg})}))
    request({
      method: 'POST',
      url,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: JSON.stringify({ report: msg }) }),
    },
    (error, response, body) => {
      // appendLogs('./server/logs/logs.txt', response.statusCode)
      if (!error) {
        callback({ error: false, details: 'Details Sent to URL' });
      } else {
        callback({ error: true, details: 'Details Not Sent to URL' });
      }
    });
  },

  sendImg(url, img, callback) {
    request({
      method: 'POST',
      url,
      formData: {
        custom_file: {
          value: img,
          options: {
            filename: 'topsecret.png',
            contentType: 'image/png',
          },
        },
      },
    },
    (err, response, body) => {
      if (!err) {
        callback({ error: true, details: 'Image Sent to URL' });
      } else {
        callback({ error: true, details: 'Image Not Sent to URL' });
      }
    });
  },

  getIP(key, url, ip, callback) {
    request({
      method: 'GET',
      url: `https://api.ipdata.co/${ip}?api-key=${key}`,
      headers: {
        Accept: 'application/json',
      },
    },
    (error, response, body) => {
      if (!error && response.statusCode == 200) {
        body = JSON.parse(body);
        request({
          method: 'POST',
          url,
          body: JSON.stringify({
            content: JSON.stringify({
              ip: body.ip, lat: body.latitude, long: body.longitude, city: body.city, asn: body.asn, flag: body.emoji_flag,
            }),
          }),
        }, (e, r, b) => {
          // appendLogs('./server/logs/logs.txt', r.statusCode)
          if (!e) {
            callback({ error: false, details: 'IP Data Sent To Url' });
          } else {
            callback({ error: true, details: 'IP Data Not Sent To Url' });
          }
        });
      } else {
        callback({ error: true, details: 'IP Data Not Found' });
      }
    });
  },

};
