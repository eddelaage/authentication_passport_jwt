const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportJWT = require("passport-jwt")
const JWTStrategy   = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
const connection = require('./helpers/db.js')

// const selectUserQuery = (`SELECT email, password FROM USERS WHERE email = ?', [email]`)

passport.use(new LocalStrategy(
  function(email, password, cb) {
    const connection = require('./helpers/db.js')
    connection.query('SELECT id, email FROM users WHERE email = ?', [email], function(err, results, fields) {
      if (err) {cb(err)}
      if (results.length === 0) {
        cb (null, false)
      }
      return cb(null, {'user_id': results[0].id})
    })
  }
));


passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey : 'your_jwt_secret'
},
function (jwtPayload, cb){
  console.log(jwtPayload)
  const user = jwtPayload
  return cb (null, user)
}))

//Connnection de base avec toto // Wildecode

//connection.queryOne('SELECT * FROM users WHERE email = ?', [email],)

// function (email, password, cb) {
//   console.log(email, password)
//   //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
//         connection.queryOne(selectUserQuery)

//            .then(user => {
//                 console.log(user)
//                if (!user) {
//                    return cb(null, false, {message: 'Incorrect email or password.'})
//                }
//                return cb(null, user, {message: 'Logged In Successfully'})
//           })
//           .catch(err => cb(err));
//     }
// ))


//Autre code

// function(req, email, password, done) { // callback with email and password from our form

//          connection.query("SELECT * FROM `users` WHERE `email` = '" + email + "'",function(err,rows){
//       if (err)
//                 return done(err);
//        if (!rows.length) {
//                 return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
//             }

//       // if the user is found but the password is wrong
//             if (!( rows[0].password == password))
//                 return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

//             // all is well, return successful user
//             return done(null, rows[0]);

//     });



//     }));