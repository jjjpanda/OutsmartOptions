var request = require('request')
var cron = require('node-cron')

const Earnings = require("./models/Earnings");

module.exports = () => {
    //cron.schedule('*/30 * * * * *', () => {
    cron.schedule('0 0-3 * * *', () => {
        console.log("---DB REQUESTED CRON JOB---");
        console.log("UPDATE EARNINGS")
        var date = new Date();
        var iterations = 0;
        var loop = setInterval( () => {
          getERCalendar(date, (body) => {
            Earnings.findOne({ company : body.ticker }).then( earnings => {
              if(earnings){
                if(date.getFullYear() == earnings.date.getFullYear() 
                    && date.getMonth() == earnings.date.getMonth() 
                    && date.getDate() == earnings.date.getDate()){
                      return;
                }
                else{
                  earnings.date = new Date(date);
                  earnings.save()
                }
              }
              else{
                const NewEarnings = new Earnings({
                  date: new Date(date),
                  company: body.ticker
                });
                NewEarnings.save()
              }
            })
          });
          date = new Date(date.setDate(date.getDate() + 1));
          iterations++
          if(iterations >= 30){
            clearInterval(loop)
          }
        }, 1500)
    },  {
        scheduled: true,
        timezone: "America/New_York"
    })
};

getERCalendar = (date, callback) => {
    request({
      method: 'get',
      url: `https://api.earningscalendar.net/?date=`+date.getFullYear()+""+(date.getMonth()+1)+""+date.getDate()+'/',
    },
    (error, response, body) => {
      if(!error && response.statusCode == 200 && body.length != 0){
        for(var company of JSON.parse(body)){
          callback(company)
        }
      }
      else{
        //Error
        console.log('EARNINGS API ERROR')
      }
    });
}