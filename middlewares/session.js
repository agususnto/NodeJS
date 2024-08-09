const session = require('express-session');

module.exports = session({
  secret: '22876692',
  resave: false,
  saveUninitialized: false,
});