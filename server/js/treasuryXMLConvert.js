const request = require('request')
const convert = require('xml-js');

module.exports = {

getYield: function (callback){
    request({
        method: 'get',
        url: 'https://data.treasury.gov/feed.svc/DailyTreasuryYieldCurveRateData?$filter=month(NEW_DATE)%20eq%2010%20and%20year(NEW_DATE)%20eq%202019',
        }, (error, response, body) => {
        if(!error && response.statusCode == 200){
            console.log(body)
            callback(convert.xml2json(body))
        }
        else{
            callback({'error':error, 'response':response.statusCode});
        }
        });
},


};
