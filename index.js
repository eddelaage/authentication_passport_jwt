require('dotenv').config()
const  http = require('http');
const express = require ('express')
const path = require ('path')
const bodyParser = require ('body-parser')
const morgan = require ('morgan')
require('./passport-strategy')
const mysql = require('mysql')
const authRouter = require('./routes/auth/auth.js')
const connection = require('./helpers/db.js')
const passport = require('passport')
const cors = require('cors')

const app = express()

app.use(cors())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS, DELETE')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended:  false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
app.use('/auth', authRouter)

app.get('/test', passport.authenticate('jwt', {session: false}), (req, res) => {
  console.log('token')
  res.send(`authorized for user ${req.user.username} with id ${req.user.id}`)
})

app.get('/', (req, res) => {
  res.send('Hello')
})

app.use(function(req, res, next) {
    var  err = new  Error('Not Found');
    err.status = 404;
    next(err)
})

let  server  =  app.listen( process.env.PORT || 3249, function(){
    console.log('Listening on port ' + server.address().port)
})