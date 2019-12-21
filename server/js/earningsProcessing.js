var request = require('request')

module.exports = {
    
    getERCalendar: (date, callback) => {
        //console.log(`https://api.earningscalendar.net/?date=`+date.getFullYear()+""+(date.getMonth()+1)+""+date.getDate()+'/')
        request({
          method: 'get',
          url: `https://api.earningscalendar.net/?date=`+date.getFullYear()+""+(date.getMonth()+1)+""+date.getDate()+'/',
        },
        (error, response, body) => {
          var dateString = response.request.path.substr(response.request.path.lastIndexOf('=') + 1, 8)
          var urlDate = new Date(dateString.substr(0, 4), parseInt(dateString.substr(4, 2))-1, dateString.substr(6, 2))
          if(!error && response.statusCode == 200 && body.length != 0){
            for(var report of JSON.parse(body)){
              callback(report.ticker, report.when == "amc" ? new Date(urlDate.getFullYear(), urlDate.getMonth(), urlDate.getDate() + 1) : urlDate )
            }
          }
          else{
            //Error
            console.log('EARNINGS API ERROR')
          }
        });
    }

}
