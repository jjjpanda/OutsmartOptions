const request = require('request')
const convert = require('xml-js');

module.exports = {

getYield: function (callback){
    request({
        method: 'get',
        url: 'https://data.treasury.gov/feed.svc/DailyTreasuryYieldCurveRateData?$filter=month(NEW_DATE)%20eq%20'+((new Date()).getMonth()+1)+'%20and%20year(NEW_DATE)%20eq%20'+((new Date()).getFullYear()),
        }, (error, response, body) => {
        if(!error && response.statusCode == 200){
            //console.log(body)
            data = (convert.xml2json(body))
            
            data = JSON.parse(data).elements[0].elements[4].elements[6].elements[0].elements.slice(2, 14).map(k => ({name: k.name, val: parseFloat(k.elements[0].text)}))
            callback(data)
        }
        else{
            callback({'error':error, 'response':response.statusCode});
        }
        });
},


};
