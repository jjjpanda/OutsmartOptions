const env = require('dotenv').config();

const secretOrKey = process.env.SECRETKEY;
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { id } = req.body;
  if (id != undefined && req.header('authorization') != undefined && req.header('authorization').split(' ')[0] == 'Bearer') {
    jwt.verify(req.header('authorization').split(' ')[1], secretOrKey + req.body.id, (err, decoded) => {
      if (err) {
        res.status(401).send({ error: true, unauthorized: true });
      } else {
        next();
      }
    });
  } else res.status(401).send({ error: true, unauthorized: true });
};
