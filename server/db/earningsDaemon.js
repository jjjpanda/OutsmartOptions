var cron = require('node-cron')
var processing = require('../js/earningsProcessing.js')

const Earnings = require("./models/Earnings");

var daemon = cron.schedule( //'*/30 * * * * *',
'0 0-3 * * *',  
() => {
  console.log("---DB REQUESTED CRON JOB---");
  console.log("TITLE: UPDATE EARNINGS")
  var date = new Date();
  var days = 6
  var iterations = 0;

  var loop = setInterval( () => {
    processing.getERCalendar(date, (company, d) => {
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
    if(iterations >= days){
      clearInterval(loop)
    }
  }

  Earnings.deleteMany( { date : {$lt : new Date()} } )
  .then(e => {
    if(!e.ok){
      console.log('UPDATE EARNINGS: Previous Dates Removed')
    }
  })
},  {
    scheduled: false,
    timezone: "America/New_York"
})

module.exports = {
  start : daemon.start,
  stop: daemon.stop,
  destroy: daemon.destroy
};