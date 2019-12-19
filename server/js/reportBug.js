const request = require('request');

module.exports = {

  sendCalcError(url, msg, callback) {
    // console.log(JSON.stringify({"content": JSON.stringify({"report": msg})}))
    request({
      method: 'POST',
      url,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: JSON.stringify({ report: msg }) }),
    },
    (error, response, body) => {
      if(!error && response.statusCode == 200){
        callback(body);
      }
      else{
        callback({error: true, details: 'Details Not Sent to URL'})
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
      if (!err && response.statusCode == 200) {
        callback(body)
      }
      else {
        callback({error: true, details: 'Image Not Sent to URL'})
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
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: JSON.stringify({
              ip: body.ip, lat: body.latitude, long: body.longitude, city: body.city, asn: body.asn, flag: body.emoji_flag,
            }),
          }),
        }, (e, r, b) => {
          if(!e && r.statusCode == 200){
            callback(b)
          }
          else{
            callback({error:true, details: 'IP Data Not Sent To Url'})
          }
        });
      } else {
        callback({error: true, details: 'IP Data Not Found'})
      }
    });
  },

};
