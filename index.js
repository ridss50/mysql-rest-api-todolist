const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

//parse application/json
app.use(bodyParser.json());
app.use(cors());

//create database connection
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected");
});

// creat a new Record
app.post("/api/create", (req, res) => {
  let data = { name: req.body.name };
  let sql = "INSERT INTO todos SET ?";
  let query = conn.query(sql, data, (err, result) => {
    if (err) throw err;
    res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: "New Record is Added successfully",
      })
    );
  });
});

//fetch all records

app.get("/api/view", (req, res) => {
  let sql = "SELECT * FROM todos";
  let query = conn.query(sql, (err, result) => {
    if (err) throw err;
    res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: result,
      })
    );
  });
});

//show a single record

app.get("/api/view/:id", (req, res) => {
  let sql = "SELECT * FROM todos WHERE id=" + req.params.id;
  let query = conn.query(sql, (err, result) => {
    if (err) throw err;
    res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: result,
      })
    );
  });
});

//update record

app.put("/api/update", (req, res) => {
  let sql =
    "UPDATE todos SET name='" + req.body.name + "' WHERE id=" + req.body.id;
  let query = conn.query(sql, (err, result) => {
    if (err) throw err;
    res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: "Record Updated Successfully",
      })
    );
  });
});

//delete record

app.delete("/api/delete/:id", (req, res) => {
  let sql = "DELETE FROM todos WHERE id=" + req.params.id;
  let query = conn.query(sql, (err, result) => {
    if (err) throw err;
    res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: "Record Deleted Succelssfully",
      })
    );
  });
});

app.listen(8000, () => {
  console.log("server started on port 8000");
});
