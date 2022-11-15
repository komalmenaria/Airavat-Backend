const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = 3000;
var mysql = require("mysql2");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// sql connection

var con = mysql.createConnection({
  host: "192.46.214.202",
  user: "db-mysql",
  password: "PNuoienw&$cGHJVJF23",
  database: "airavat",
});

con.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("Connect");
  }
});

// post inputs to database

app.post("/",  (req, res) => {

       con.query(
        "insert into contact (name,email,phone ,desc) values ( ?,?,?,?)  ",
        [req.body.name,  req.body.email, req.body.phone, req.body.desc],
        (err) => {
          if (err) {
            console.log(err);
            return res.send("insert failed");
          } else {
            res.send("product created successfully");
          }
        }
      );
    });







// get inputs

app.get("/", async (req, res) => {
  con.query("select * from contact", [], async (error, data) => {
    if (error) {
      console.log(error);
      res.send("faitching data failed");
    } else {
      console.log(data);
      res.send("faitching data successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
