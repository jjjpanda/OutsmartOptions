var request = require('request')
var cron = require('node-cron')

const Earnings = require("./models/Earnings");

var daemon = cron.schedule('0 0-3 * * *',  //'*/30 * * * * *'
() => {
  console.log("---DB REQUESTED CRON JOB---");
  console.log("UPDATE EARNINGS")
  var date = new Date();
  var iterations = 0;
  var loop = setInterval( () => {
    getERCalendar(date, (company, d) => {
      Earnings.findOne({ company : company }).then( earnings => {
        if(earnings){
          if(d.getFullYear() == earnings.date.getFullYear() 
              && d.getMonth() == earnings.date.getMonth() 
              && d.getDate() == earnings.date.getDate()){
                return;
          }
          else{
            earnings.date = new Date(d);
            earnings.save()
          }
        }
        else{
          const NewEarnings = new Earnings({
            date: new Date(d),
            company: company
          });
          NewEarnings.save()
        }
      })
    });
    iterate()
  }, 1500)
  var iterate = () => {
    date = new Date(date.setDate(date.getDate() + 1));
    iterations++
    if(iterations >= 14){
      clearInterval(loop)
    }
  }
},  {
    scheduled: false,
    timezone: "America/New_York"
})

var getERCalendar = (date, callback) => {
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

module.exports = {
  start : daemon.start,
  stop: daemon.stop,
  destroy: daemon.destroy
};