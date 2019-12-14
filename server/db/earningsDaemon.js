var request = require('request')
var cron = require('node-cron')

module.exports = () => {
    cron.schedule('0 0-3 * * *', () => {
        console.log("---DB REQUESTED CRON JOB---");
        console.log("UPDATE EARNINGS")
        /*

        Do what must be done.
        Summon him.
        Example Below

        */
        getERCalendar(new Date(), () => {});
    },  {
        scheduled: true,
        timezone: "America/New_York"
    })
};

getERCalendar = (date, callback) => {
    request({
      method: 'get',
      url: `https://api.earningscalendar.net/?date=`+date.getFullYear()+""+(date.getMonth()+1)+""+date.getDate(),
    },
    (error, response, body) => {
      if(!error && response.statusCode == 200){
        console.log(body)
        callback();
      }
      else{
        //Error
      }
    });
}