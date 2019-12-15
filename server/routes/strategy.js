const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("./auth")(jwt)
const env = require('dotenv').config();
secretOrKey = process.env.SECRETKEY

const Strategy = require("../db/models/Strategy");

router.post('/viewAll', auth, (req, res) => {
    res.json({hi: 'hi'})
})

router.post('/viewStock', auth, (req, res) => {
    res.json({hi: 'hi'})
})

module.exports = router