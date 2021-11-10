const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("hello!");
});

app.get("/write", (req, res) => {
  const content = fs.readFileSync("../database/db.txt");
  fs.writeFileSync(
    "../database/db.txt",
    `${content}--${req.query.title}${
      req.query.type ? "&&" + req.query.type : ""
    }${req.query.url ? "&&" + req.query.url : ""}`
  );
  res.send("Successfull!");
});

app.get("/read", (req, res) => {
  res.json(fs.readFileSync("../database/db.txt").toString());
});

app.listen(3000, () => {
  console.log("Listening on 3000");
});
