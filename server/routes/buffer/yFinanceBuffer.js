const request = require('request');

module.exports = {

    getQuote(req, res, next){
        request({
            method: 'get',
            url: `https://query1.finance.yahoo.com/v7/finance/quote`,
            qs: {
                symbols: req.body.ticker
            }
        }, (error, response, body) => {
            if(!error && response.statusCode == 200){
                let data
                body = JSON.parse(body)
                if(body.quoteResponse != undefined && body.error == null && body.quoteResponse.result.length != 0){
                    data = body.quoteResponse.result[0]
                }
                else{
                    data = {earningsTimestamp: false, dividendDate: false, trailingAnnualDividendYield: 0, trailingAnnualDividendRate: 0}
                }
                req.body.answer.quote = { 
                    ...req.body.answer.quote, 
                    earningsDate: new Date(data.earningsTimestamp * 1000),  
                    divDate: data.dividendDate != undefined ? new Date(data.dividendDate * 1000) : false,
                    divRate: data.trailingAnnualDividendRate != undefined ? data.trailingAnnualDividendRate : 0,
                    divYield: data.trailingAnnualDividendYield != undefined ? data.trailingAnnualDividendYield : 0, 
                }
                next()
            }
            else{
                res.json({ error: true, details: "Data Formatting Error" });
            }
        });
    }
}