const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},

function (username, password, cb) {
  console.log(username, password)
  //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
  if (password !== 'wildecode') {
    return cb(null, false, {message: 'Incorrect username or password.'})
  } else {
    return cb(null, username, {message: 'Logged In Successfully'})
    }
  }
))