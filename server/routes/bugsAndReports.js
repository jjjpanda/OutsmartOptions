const express = require("express");
const router = express.Router();

const env = require('dotenv').config();

const iptrackkey = process.env.iptrack;
const { bugUrl } = process.env;
const { ipUrl } = process.env;

const reportBugs = require('../js/reportBug.js');

router.post('/track', (req, res) => {
  reportBugs.getIP(iptrackkey, ipUrl, req.body.ip);
});

router.post('/report', (req, res) => {
  reportBugs.sendCalcError(bugUrl, req.body.options, (data) => {
    res.json(data);
  });
});

router.post('/imageReport', (req, res) => {
  reportBugs.sendImg(bugUrl, req.files.file.data);
});

module.exports = router