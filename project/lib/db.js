var mysql  = require('mysql');

db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  port : '3308',
  database : 'traveltrace'
    
  });
  db.connect();
  module.exports = db;