const express = require("express");
const router = express.Router();

const env = require('dotenv').config();

const treasuryXML = require('../js/treasuryXMLConvert.js');

router.post('/treasury', (req, res) => {
    treasuryXML.getYield((data) => {
        res.json(data);
    });
});

module.exports = router