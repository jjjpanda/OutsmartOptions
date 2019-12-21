const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../js/authorizeUser")(jwt)
const env = require('dotenv').config();
const secretOrKey = process.env.SECRETKEY

const Watchlist = require("../db/models/Watchlist");
const User = require('../db/models/User')

router.post('/view', auth, (req, res) => {
    User.findById(req.body.id).then(user => {
        if(user){
            Watchlist.findOne({user: user}).then(watchlist => {
                if(watchlist){
                    res.json({list: watchlist.stocks})
                }
                else{
                    const newWatchlist = new Watchlist({user: user, stocks: []}) 
                    newWatchlist.save().then(() => {
                        res.json({list: []})
                    })
                }
            })
        }
        else{
            res.json({user: 'not found'})
        }
    })
})

router.post('/edit', auth, (req, res) => {
    User.findById(req.body.id).then(user => {
        if(user){
            Watchlist.findOne({user: user}).then(watchlist => {
                if(watchlist){
                    var index = watchlist.stocks.indexOf(req.body.ticker);
                    if (index >= 0) {
                        watchlist.stocks.splice( index, 1 );
                    }
                    else{
                        watchlist.stocks.push(req.body.ticker)
                    }
                    watchlist.save().then(() => {
                        res.json({list: watchlist.stocks})
                    })
                }
                else{
                    const newWatchlist = new Watchlist({user: user, stocks: [req.body.ticker]}) 
                    newWatchlist.save().then(() => {
                        res.json({list: newWatchlist.stocks})
                    })
                }
            })
        }
        else{
            res.json({user: 'not found'})
        }
    })
})

module.exports = router