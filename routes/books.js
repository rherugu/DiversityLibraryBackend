const express = require("express");
const router = express.Router();
const Book = require("../models/Books.js");
const verify = require("./verifyToken");

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.log(err, "error");
    res.json({ message: err });
  }
});

router.get("/pagination", async (req, res) => {
  try {
    const perPage = 10;

    let page = req.headers.page;
    // Select the 1st - 17th document
    var results = await Book.find()
      .skip(page * perPage)
      .limit(perPage);
    res.json(results);
  } catch (err) {
    console.log(err, "error");
    res.json({ message: err });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updatedBook = await Book.updateOne(
      { _id: req.params.id },
      {
        $set: {
          checkedOut: req.body.checkedOut,
        },
      }
    );
    res.json(updatedBook);
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  const books = new Book({
    title: req.body.title,
    author: req.body.author,
    checkedOut: false,
  });
  try {
    const savedBook = await books.save();
    res.json({ savedBook, message: "Success!", check: 200 });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
