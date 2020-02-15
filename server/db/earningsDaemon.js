const cron = require('node-cron');
const processing = require('../js/earningsProcessing.js');

const appendLogs = require('../logs/appendLogs.js')

const Earnings = require('./models/Earnings');

const daemon = cron.schedule( // '*/30 * * * * *',
  '0 0-3 * * *',
  () => {
    appendLogs('./server/logs/logs.txt', '---DB REQUESTED CRON JOB---');
    appendLogs('./server/logs/logs.txt', 'TITLE: UPDATE EARNINGS');
    let date = new Date();
    const days = 6;
    let iterations = 0;

    const loop = setInterval(() => {
      processing.getERCalendar(date, (company, d) => {
        Earnings.findOne({ company }).then((earnings) => {
          if (earnings) {
            if (d.getFullYear() == earnings.date.getFullYear()
              && d.getMonth() == earnings.date.getMonth()
              && d.getDate() == earnings.date.getDate()) {

            } else {
              earnings.date = new Date(d);
              earnings.save();
            }
          } else {
            const NewEarnings = new Earnings({
              date: new Date(d),
              company,
            });
            NewEarnings.save();
          }
        });
      });
      iterate();
    }, 1500);
    var iterate = () => {
      date = new Date(date.setDate(date.getDate() + 1));
      iterations++;
      if (iterations >= days) {
        clearInterval(loop);
      }
    };

    Earnings.deleteMany({ date: { $lt: new Date() } })
      .then((e) => {
        if (!e.ok) {
          appendLogs('./server/logs/logs.txt', 'UPDATE EARNINGS: Previous Dates Removed');
        }
      });
  }, {
    scheduled: false,
    timezone: 'America/New_York',
  },
);

module.exports = {
  start: daemon.start,
  stop: daemon.stop,
  destroy: daemon.destroy,
};
