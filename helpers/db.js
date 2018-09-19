const mysql = require('mysql')
const connection = mysql.createConnection({
  "host": process.env.DB_HOST,
  "user": process.env.DB_USER,
  "password": process.env.DB_PASS,
  "database": process.env.DB_DATABASE,
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