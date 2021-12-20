const express = require("express");
const mysql = require("mysql");
require('dotenv').config();



const app = express();
const port = 3001;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "login",
});

db.connect((err) => {
  if (err) throw err;
  else {
    console.log("conection successfull");
  }
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let errors = [];

  if(username.length === 0){errors.push("Please enter a valid Username")}
  if(password.length===0){errors.push("Please enter a valid Password")}
if(errors.filter(e=>e.length>0).length>0){
    res.send(errors);
}
 else{ db.query(
    "INSERT INTO users (username, password) VALUES (?,?)",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );}
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        if (result.length > 0) {
          res.send(result);
        } else {
          res.send({ message: "Wrong combination: Username/Password" });
        }
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening in http://localhost:${port}`);
});
