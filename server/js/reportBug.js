const request = require('request')

module.exports = {

sendCalcError: function (url, msg, callback){
    //console.log(JSON.stringify({"content": JSON.stringify({"report": msg})}))
    request({ 
        method: "POST",
        url: url,
        headers : { 'Content-Type' : 'application/json'},
        body : JSON.stringify({"content": JSON.stringify({"report": msg})})
    }, 
    (error, response, body) => {
        callback({'error':error, 'response':response.statusCode})
    })
},

sendImg: function(url, img){
    request({ 
        method: "POST",
        url: url,
        formData : {
            custom_file: {
                value:  img,
                options: {
                  filename: 'topsecret.png',
                  contentType: 'image/png'
                }
            }
        }
    },
    (err, httpResponse, body) => {
        if (err) {
          //return console.error('upload failed:', err);
        }
        //console.log('Upload successful!  Server responded with:', body);
    })
},

getIP: function (key, url, ip){
    request({
        method: "GET",
        url: "https://api.ipdata.co/"+ip+"?api-key="+key,
        headers: {
            "Accept": 'application/json'
        }
    },
    function (error, response, body){
        if(!error && response.statusCode == 200){
            body = JSON.parse(body)
            request({ 
                method: "POST",
                url: url,
                headers : { 'Content-Type' : 'application/json'},
                body : JSON.stringify({"content": JSON.stringify({'ip': body.ip, 'lat': body.latitude, 'long': body.longitude, 'city': body.city, 'asn': body.asn, 'flag':body.emoji_flag})})
            })
        }
        else{

        }
    }
    )
}

};
