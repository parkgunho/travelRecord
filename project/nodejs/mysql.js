var mysql      = require('mysql'); //mysql module 사용 선언
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'test',
  password : 'test',
  port : '3306',
  database : 'traveltrace'
});
 
connection.connect();
 
connection.query('SELECT * FROM t_user', function (error, results, fields) {
  if (error){
    console.log(error);
  }
    console.log(results);
});
 
connection.end();