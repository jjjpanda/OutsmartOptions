var cron = require('node-cron')

module.exports = () => {
    cron.schedule('0 0-3 * * *', () => {
        console.log("---DB REQUESTED CRON JOB---");
        console.log("UPDATE EARNINGS")
        /*

        Do what must be done.
        https://api.earningscalendar.net/?date=20200110
        Summon him.

        */

    },  {
        scheduled: true,
        timezone: "America/New_York"
    })
};