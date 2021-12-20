const mysql      = require('mysql');

let db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
  });

db.connect((err) => {
    if (err) throw err;
    else {
      console.log("conection successfull");
      db.query("CREATE DATABASE IF NOT EXISTS login2", function (err, result) {
        if (err) throw err;
        console.log("Database created");
      });
    }
  });
db.end((err) => {
    if (err) throw err;
    else {
        console.log("disconected");
    }
})
  

 db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "login"
  });
  
  db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE IF NOT EXISTS users (idUsers INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)";
    db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });