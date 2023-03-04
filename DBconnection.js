const mysql = require('mysql')

// Create Connection
function getconnection() {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'comments',
  })
  return db
}

module.exports.getconnection = getconnection
