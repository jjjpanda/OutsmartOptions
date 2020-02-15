const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../js/authorizeUser')(jwt);
const env = require('dotenv').config();

const secretOrKey = process.env.SECRETKEY;

const validate = require('../db/loginValidation.js');

const appendLogs = require("../logs/appendLogs.js")

const User = require('../db/models/User');

router.post('/register', (req, res) => {
  // Form validation
  const { errors, isValid } = validate.validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then((user) => res.json(user))
          .catch((err) => appendLogs('./server/logs/logs.txt', err));
      });
    });
  });
});

router.post('/login', (req, res) => {
  // Form validation
  const { errors, isValid } = validate.validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email } = req.body;
  const { password } = req.body;
  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: 'Email not found' });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };
        // Sign token
        jwt.sign(
          payload,
          secretOrKey + user.id,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              id: user.id,
              token: `Bearer ${token}`,
            });
          },
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: 'Password incorrect' });
      }
    });
  });
});

router.post('/current', auth, (req, res) => {
  const { id } = req.body;
  User.findById(id).then((user) => {
    if (!user) {
      return res.sendStatus(400);
    }

    return res.json({ user: user.name, email: user.email });
  }).catch((error) => {
    res.json({ error });
  });
});

router.post('/change', auth, (req, res) => {
  const { id, oldPassword, newPassword, newPassword2 } = req.body 
  if(oldPassword == undefined || newPassword == undefined || newPassword2 == undefined){
    return res.sendStatus(400)
  }
  User.findById(id).then((user) => {
    if(!user) {
      return res.sendStatus(400)
    }

    bcrypt.compare(oldPassword, user.password).then((isMatch) => {
      if (isMatch) {
        if(newPassword == newPassword2){
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newPassword, salt, (err, hash) => {
              if (err) throw err;
              user.password = hash;
              user
                .save()
                .then((user) => res.json({'changed': true}))
                .catch((err) => res.json({'changed': false}));
            });
          });
        }
        else{
          res.json({'error': 'Passwords don\'t match'})
        }
      } else {
        res.json({'error': 'Incorrect Password'})
      }
    });

  })
})

router.post('/delete', auth, (req, res, next) => {
  const { id } = req.body;
  User.findByIdAndDelete(id).then((err, user) => {
    if (!err) {
      return res.sendStatus(400);
    }

    return res.json({ deleted: true });
  });
});

module.exports = router;
