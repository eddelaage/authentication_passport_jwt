const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const Joi = require('joi')
const connection = require('../../helpers/db.js')
var bcrypt = require('bcrypt')
const saltRounds = 10

router.get('/', (req, res) =>{
  res.send('I am in auth')
})

//POST login
router.post('/login', function (req, res, next){
  // console.log(req.body)
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user : user
      })
    }
    req.login(user, {session: false}, (err) => {
      if (err) {
        res.send(err)
      }
      const token = jwt.sign(user, 'your_jwt_secret')
      return res.json({user, token})
    })
  })(req, res, next)
})

router.get('/test', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.send(`authorized for user ${req.user.email} with id ${req.user.id}`)
})

//ADD USER

router.post('/signup', function(req, res, next) {

  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/).required(),
    // The same regex than registration form in client
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    // birthDate: Joi.date().timestamp().required(),
    gender: Joi.string().required()
  })

  Joi.validate({ email:req.body.email, password: req.body.password, firstName: req.body.firstName, lastName: req.body.lastName, gender: req.body.gender }, schema, function (err, value){

    const email = req.body.email
    const password = req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const birthDate = req.body.birthDate
    const gender = req.body.gender
    const values = [email, password, firstName, lastName, birthDate, gender]

      if (err === null){
        const signup = new Promise(function(resolve, reject){
          bcrypt.hash(password, saltRounds).then(function(hash) {
          connection.query(`INSERT INTO users (email, password, firstName, lastName, birthDate, gender)
            VALUES (?, ?, ?, ?, ?, ?)`,[email, hash, firstName, lastName, birthDate, gender])
      })
        .then(result => {
          res.status(200).json({ flash:  "User has been signed up !" })
        })
        .catch(err => {
          res.status(500).json({ flash:  err.message })
        })
      })
    }
    else {
      console.log(err)
      res.status(500).send('Something broke!')
    }
  })
})

module.exports = router



