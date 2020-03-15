const env = require('dotenv').config();

const secretOrKey = process.env.SECRETKEY;

module.exports = (jwt) => (req, res, next) => {
  if (req.header('authorization') != undefined && req.header('authorization').split(' ')[0] == 'Bearer') {
    jwt.verify(req.header('authorization').split(' ')[1], secretOrKey + req.body.id, (err, decoded) => {
      if (err) {
        res.status(401).send({ unauthorized: true });
      } else {
        next();
      }
    });
  } else res.status(401).send({ unauthorized: true });
};