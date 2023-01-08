// Set up MySQL connection.
const mysql = require("mysql");
const util = require('util');
require('dotenv').config()
// enviromental variables
const PORT = process.env.PORT
const USER = process.env.USER
const PASS = process.env.PASS
const HOST = process.env.HOST
const DB = process.env.DB


const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: PORT,
  user: USER,
  password: PASS,
  database: DB
});

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

connection.query = util.promisify(connection.query);

// Export connection for our ORM to use.
module.exports = connection;
