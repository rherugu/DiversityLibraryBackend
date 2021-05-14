const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
require("dotenv/config");

app.use(bodyParser.json());

const usersRoute = require("./routes/users.js");
const loginRoute = require("./routes/login.js");
const booksRoute = require("./routes/books.js");
app.use("/users", usersRoute);
app.use("/login", loginRoute);
app.use("/books", booksRoute);

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

app.listen(3000);
