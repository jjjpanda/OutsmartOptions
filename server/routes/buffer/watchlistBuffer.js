const Watchlist = require('../../daemons/models/Watchlist');
const User = require('../../daemons/models/User');

module.exports = {
    viewWatchlist(req, res) {
        User.findById(req.body.id).then((user) => {
            if (user) {
            Watchlist.findOne({ user }).then((watchlist) => {
                if (watchlist) {
                    res.json({ list: watchlist.stocks });
                } else {
                    const newWatchlist = new Watchlist({ user, stocks: [] });
                    newWatchlist.save().then(() => {
                        res.json({ list: [] });
                    });
                }
            });
            } else {
            res.json({ error: true, details: 'User Not Found' });
            }
        });
    },

    addToWatchlist(req, res) {
        if(req.body.answer.quote.found){
            User.findById(req.body.id).then((user) => {
                if (user) {
                  Watchlist.findOne({ user }).then((watchlist) => {
                    if (watchlist) {
                      const index = watchlist.stocks.indexOf(req.body.ticker);
                      if (index >= 0) {
                        res.json({ error: true, details: 'Stock Already in Watchlist' });
                      } else {
                        watchlist.stocks.push(req.body.ticker);
                        watchlist.save().then(() => {
                            res.json({ list: watchlist.stocks });
                        });
                      }
                    } else {
                      const newWatchlist = new Watchlist({ user, stocks: [req.body.ticker] });
                      newWatchlist.save().then(() => {
                        res.json({ list: newWatchlist.stocks });
                      });
                    }
                  });
                } else {
                  res.json({ error: true, details: 'User Not Found' });
                }
            });
        }
        else{
            res.json({ error: true, details: 'Not a Stock' });
        }
    },

    removeFromWatchlist(req, res) {
        User.findById(req.body.id).then((user) => {
            if (user) {
              Watchlist.findOne({ user }).then((watchlist) => {
                if (watchlist) {
                  const index = watchlist.stocks.indexOf(req.body.ticker);
                  if (index >= 0) {
                    watchlist.stocks.splice(index, 1);
                    watchlist.save().then(() => {
                        res.json({ list: watchlist.stocks });
                    });
                  } else {
                    res.json({ error: true, details: "Stock Not in Watchlist" })
                  }
                }
              });
            } else {
              res.json({ error: true, details: 'User Not Found' });
            }
        });
    },
    
    editWatchlist(req, res) {
        User.findById(req.body.id).then((user) => {
          if (user) {
            Watchlist.findOne({ user }).then((watchlist) => {
              if (watchlist) {
                const index = watchlist.stocks.indexOf(req.body.ticker);
                if (index >= 0) {
                  watchlist.stocks.splice(index, 1);
                } else {
                  watchlist.stocks.push(req.body.ticker);
                }
                watchlist.save().then(() => {
                  res.json({ list: watchlist.stocks });
                });
              } else {
                const newWatchlist = new Watchlist({ user, stocks: [req.body.ticker] });
                newWatchlist.save().then(() => {
                  res.json({ list: newWatchlist.stocks });
                });
              }
            });
          } else {
            res.json({ user: 'not found' });
          }
        });
    },
}