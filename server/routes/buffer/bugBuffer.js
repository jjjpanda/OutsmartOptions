const request = require('request');
const appendLogs = require('../../logs/appendLogs.js');

const env = require('dotenv').config();

const iptrackkey = process.env.iptrack;
const { bugUrl } = process.env;
const { ipUrl } = process.env;

module.exports = {

    getIP(req, res, next){
        request({
            method: 'GET',
            url: `https://api.ipdata.co/${req.body.ip}?api-key=${iptrackkey}`,
            headers: {
              Accept: 'application/json',
            },
        },
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
              req.answer = JSON.parse(body)
              next()
            } else {
              res.json({ error: true, details: 'IP Data Not Found' });
            }
        });
    },

    ipBuffer(req, res, next){
        request({
            method: 'POST',
            url: ipUrl,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: JSON.stringify({
                    ip: req.answer.ip, 
                    lat: req.answer.latitude, 
                    long: req.answer.longitude,
                    city: req.answer.city, 
                    asn: req.answer.asn, 
                    flag: req.answer.emoji_flag,
                }),
            }),
        }, (error, response, body) => {
            if (!error) {
                res.json({ error: false, details: 'IP Data Sent To Url' });
            } else {
                res.json({ error: true, details: 'IP Data Not Sent To Url' });
            }
        });
    },
    
    reportBuffer(req, res, next){
        request({
            method: 'POST',
            url: bugUrl,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: JSON.stringify({ report: req.body.options }) }),
        },
        (error, response, body) => {
            if (!error) {
                res.json({ error: false, details: 'Details Sent to URL' });
            } else {
                res.json({ error: true, details: 'Details Not Sent to URL' });
            }
        });
    },

    imageBuffer(req, res, next){
        request({
            method: 'POST',
            url: bugUrl,
            formData: {
                custom_file: {
                value: req.files.file.data,
                options: {
                    filename: 'topsecret.png',
                    contentType: 'image/png',
                },
                },
            },
        },
        (err, response, body) => {
            if (!err) {
                res.json({ error: true, details: 'Image Sent to URL' });
            } else {
                res.json({ error: true, details: 'Image Not Sent to URL' });
            }
        });
    }
  
};
  