const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { pgClient } = require("./utils/db");

const exerciseRoutes = require("./routes/exercises");
const muscleRoutes = require("./routes/muscles");

const app = express();
app.use(cors());
app.use(bodyParser.json());

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

app.use("/exercises", exerciseRoutes);
app.use("/muscles", muscleRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({ data: err.data, message: err.message });
});

pgClient.connect((err, client) => {
  if (err) {
    console.log("could not connect to the database. Trying again...");
    client.connect();
  }
  console.log("Connected to the database.");
  client.on("error", () => client.connect());
  app.listen(5000, () => console.log("Listening on port 5000..."));
});
