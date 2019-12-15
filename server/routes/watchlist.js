const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("./auth")(jwt)
const env = require('dotenv').config();
secretOrKey = process.env.SECRETKEY

const Watchlist = require("../db/models/Watchlist");

router.post('/view', auth, (req, res) => {
    res.json({hi: 'hi'})
})

router.post('/edit', auth, (req, res) => {
    res.json({hi: 'hi'})
})

module.exports = router