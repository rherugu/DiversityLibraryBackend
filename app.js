const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
var cors = require("cors");
require("dotenv/config");

app.use(bodyParser.json());

app.use(cors());

const usersRoute = require("./routes/users.js");
const loginRoute = require("./routes/login.js");
const booksRoute = require("./routes/books.js");
app.use("/users", cors(), usersRoute);
app.use("/login", cors(), loginRoute);
app.use("/books", cors(), booksRoute);

app.get("/", (req, res) => {
  res.send("DiversityLibrary Backend.");
});

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to database successful");
  }
);

const port = process.env.PORT || "3000";
app.listen(port);
