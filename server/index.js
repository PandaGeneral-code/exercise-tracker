const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const keys = require("./keys");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const { Pool } = require("pg");
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

app.get("/values", async (req, res) => {
  pgClient.query(`SELECT * FROM values;`, (err, results) => {
    if (err) {
      return console.log(err);
    }
    res.status(200).json({ data: results.rows });
  });
});

app.post("/values", (req, res) => {
  const value = req.body.value;
  console.log(req.body);
  pgClient.query(
    `INSERT INTO values (number) 
    VALUES ($1)
    RETURNING *`,
    [value],
    (err, result) => {
      if (err) {
        res
          .status(400)
          .json({ message: "Something went wrong. Please try again later." });
        return console.log(err);
      }
      res.status(201).json({ data: result.rows[0] });
    }
  );
});

app.get("/", (req, res) => res.status(200).json({ message: "Done" }));

setTimeout(() => {
  pgClient.connect((err, client) => {
    if (err) {
      return console.log("Could not connect to the database");
    }
    client.query(
      `CREATE TABLE IF NOT EXISTS values (number INT)`,
      (err, result) => {
        if (err) {
          return console.log(
            "Could not establish a connection with the database. Please try again later."
          );
        }
        console.log("Tables set up.");
        app.listen(5000, () => console.log(`Listening on port 5000...`));
      }
    );
  });
}, 1000);
