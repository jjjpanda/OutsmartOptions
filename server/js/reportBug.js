const request = require('request')

module.exports = {

sendCalcError: function (url, msg, callback){
    console.log(JSON.stringify({"content": JSON.stringify({"report": msg})}))
    request({ 
        method: "POST",
        url: url,
        headers : { 'Content-Type' : 'application/json'},
        body : JSON.stringify({"content": JSON.stringify({"report": msg})})
    }, 
    (error, response, body) => {
        if(!error && response.statusCode == 200){
            callback({'error':error, 'response':response.statusCode})
        }
        else{
            callback({'error':error, 'response':response.statusCode});
        }
    })
    
}

};
