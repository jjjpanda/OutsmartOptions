const request = require('request')
const convert = require('xml-js');

module.exports = {

getYield: function (callback){
    var date = new Date()
    if(date.getDay() == 0){
        date.setDate(date.getDate()-2)
    }
    else if(date.getDay() == 6){
        date.setDate(date.getDate()-1)
    }
    var year = date.getFullYear()
    var month = date.getMonth()+1
    var day  = date.getDate()
    request({
        method: 'get',
        url: 'https://data.treasury.gov/feed.svc/DailyTreasuryYieldCurveRateData?$filter=month(NEW_DATE)%20eq%20'+month+'%20and%20year(NEW_DATE)%20eq%20'+year+'and%20day(NEW_DATE)%20eq%20'+day,
        }, (error, response, body) => {
        if(!error && response.statusCode == 200){
            //console.log(body)
            data = (convert.xml2json(body))
            try {
                data = JSON.parse(data).elements[0].elements[4].elements[6].elements[0].elements.slice(2, 14).map(k => ({name: k.name, val: parseFloat(k.elements[0].text)}))
            }
            catch(error) {
                //console.error(error);
                data = []
            }
            callback(data)
        }
        else{
            callback({'error':error, 'response':response.statusCode});
        }
        });
},


};
