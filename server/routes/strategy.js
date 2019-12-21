const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../js/authorizeUser")(jwt)
const env = require('dotenv').config();
const secretOrKey = process.env.SECRETKEY

const Strategy = require("../db/models/Strategy");
const User = require('../db/models/User')

router.post('/load', auth, (req, res) => {
    User.findById(req.body.id).then(user => {
        if(user){
            Strategy.find({user: user, stock: req.body.ticker}).then(strategies => {
                console.log(strategies)
                if(strategies){
                    res.json({strategies: strategies})
                }
                else{
                    res.json({strategy: false})
                }
            })
        }
        else{
            res.json({user: 'not found'})
        }
    })
})

router.post('/delete', auth, (req, res) => {
    User.findById(req.body.id).then(user => {
        if(user){
            Strategy.deleteOne({user: user, stock: req.body.ticker, legs: req.body.strategy}).then(e => {
                if(e){
                    res.json({error:true, details: e})
                }
                else{
                    res.json({error: false, details: e})
                }
            })
        }
        else{
            res.json({user: 'not found'})
        }
    })
})

router.post('/save', auth, (req, res) => {
    if(!(req.body.strategy instanceof Array)){
        res.json({error: true, details: 'Badly Formatted Strategies'})
        return
    }
    for(let strat of req.body.strategy){
        if(!(strat instanceof Object)){
            res.json({error: true, details: 'Badly Formatted Strategies'})
            return
        }
    }
    User.findById(req.body.id).then(user => {
        if(user){
            Strategy.findOne({user: user, legs: req.body.strategy}).then(strategy => {
                if(strategy){
                    res.json({error:true, details: 'Strategy already exists'})
                }
                else{
                    var newStrat = new Strategy({user: user, stock: req.body.ticker, legs: req.body.strategy})
                    newStrat.save()
                    res.json({strategy: true})
                }
            })
        }
        else{
            res.json({user: 'not found'})
        }
    })
})

module.exports = router