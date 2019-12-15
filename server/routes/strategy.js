const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../js/authorizeUser")(jwt)
const env = require('dotenv').config();
secretOrKey = process.env.SECRETKEY

const Strategy = require("../db/models/Strategy");
const User = require('../db/models/User')

router.post('/save', auth, (req, res) => {
    User.findById(req.body.id).then(user => {
        if(user){
            res.json({user: 'found'})
        }
        else{
            res.json({user: 'not found'})
        }
    })
})

module.exports = router