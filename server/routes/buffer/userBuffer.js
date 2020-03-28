const env = require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretOrKey = process.env.SECRETKEY;

const User = require('../../daemons/models/User');

const appendLogs = require('../../logs/appendLogs.js');

module.exports = {

  registerUser(req, res) {
    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        res.status(400).json({ error: true, details: 'Buffer Error from registerUser in userBuffer' });
      }
      else{
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            else{
              newUser.password = hash;
              newUser
                .save()
                .then((user) => res.json({ registered: { name: user.name, email: user.email, date: user.date } }))
                .catch((err) => appendLogs('./server/logs/logs.txt', err));
            
            }
          });
        });
      }
    });
  },

  loginUser(req, res) {
    const { email } = req.body;
    const { password } = req.body;
    // Find user by email
    User.findOne({ email }).then((user) => {
      // Check if user exists
      if (!user) {
        res.status(400).json({ error: true, details: 'Buffer Error from loginUser in userBuffer' });
      }
      else{
        // Check password
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (isMatch) {
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
                res.json({ login: {
                  success: true,
                  id: user.id,
                  token: `Bearer ${token}`,
                }});
              },
            );
          } else {
            res.status(400).json({ error: true, details: 'Buffer Error from loginUser in userBuffer', errors: "Password Incorrect" });
          }
        });
      }
    });
  },

  currentUser(req, res) {
    const { id } = req.body;
    User.findById(id).then((user) => {
      if (!user) {
        res.status(400).json({ error: true, details: 'Buffer Error from currentUser in userBuffer' });
      }
      else{
        res.json({current: { name: user.name, email: user.email }});
      }
    }).catch((errors) => {
      res.json({ error: true, details: 'Buffer Error from currentUser in userBuffer', errors });
    });
  },

  changePassword(req, res) {
    const { id, oldPassword, newPassword, newPassword2 } = req.body;
    if (oldPassword == undefined || newPassword == undefined || newPassword2 == undefined) {
      res.status(400).json({ error: true, details: 'Buffer Error from changePassword in userBuffer' });
    }
    User.findById(id).then((user) => {
      if (!user) {
        res.status(400).json({ error: true, details: 'Buffer Error from changePassword in userBuffer' });
      }
      else {
        bcrypt.compare(oldPassword, user.password).then((isMatch) => {
          if (isMatch) {
            if (newPassword == newPassword2) {
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newPassword, salt, (err, hash) => {
                  if (err) throw err;
                  else{
                    user.password = hash;
                    user
                      .save()
                      .then((user) => res.json({ changed: true }))
                      .catch((err) => res.json({ changed: false }));
                  }
                });
              });
            } else {
              res.status(400).json({ error: true, details: 'Buffer Error from changePassword in userBuffer', errors: "Passwords don't match" });
            }
          } else {
            res.status(400).json({ error: true, details: 'Buffer Error from changePassword in userBuffer', errors: "Passwords Incorrect" });
          }
        });
      }
    });
  },

  deleteUser(req, res, next) {
    const { id } = req.body;
    User.findByIdAndDelete(id).then((err, user) => {
      if (!err) {
        res.status(400).json({ error: true, details: 'Buffer Error from deleteUser in userBuffer' });
      }
      else{
        res.json({ deleted: true });
      }
    });
  },

};
