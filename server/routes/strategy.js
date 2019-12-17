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
                if(strategies){
                    res.json(strategies)
                }
                else{
                    res.json({strategies: false})
                }
            })
        }
        else{
            res.json({user: 'not found'})
        }
    })
})

router.post('/save', auth, (req, res) => {
    User.findById(req.body.id).then(user => {
        if(user){
            var newStrat = new Strategy({user: user, stock: req.body.ticker, strategy: req.body.strategy})
            newStrat.save()
            res.json({strategies: true})
        }
        else{
            res.json({user: 'not found'})
        }
    })
})

module.exports = router