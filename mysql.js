var mysql = require('mysql');
var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  host: "localhost",
  user: "root",
  password: "",
  password: "",
  database: "db_cinema"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

 