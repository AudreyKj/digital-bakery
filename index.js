const express = require("express");
const path = require("path");
const cors = require("cors");
const { pool } = require("./db.js");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

//ROUTE: make order
app.post("/order", async (req, res) => {
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const newOrder = await pool.query(
      "INSERT INTO orders(created_at) VALUES($1) RETURNING *",
      [timestamp]
    );
    return res.json(newOrder.rows);
  } catch (error) {
    return res.json({ error: error.message });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(process.env.PORT || 5000);
