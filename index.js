const express = require ('express')
const path = require ('path')
const bodyParser = require ('body-parser')
const morgan = require ('morgan')
require('./passport-strategy')
const auth = require('./auth')
const app = express()

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
app.use('/auth', auth)

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