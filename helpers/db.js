const mysql = require('mysql')
const config = require('../config.json')
const connection = mysql.createConnection({
  "host": "localhost",
  "user": "root",
  "password": "mysql181082",
  "database": "authentication_passport_jwt"
})

connection.connect()

module.exports = connection


// const mysql = require('mysql2/promise')
// const config = require('../config.json')
// const pool = mysql.createPool(config.mysql)

// const first = async p => (await p)[0]

// const exec = (query, params) => first(pool.query(query, params))

// module.exports = {
//   query: exec,
//   queryOne: (query, params) => first(exec(query, params))
// }