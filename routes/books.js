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

router.post("/search", async (req, res) => {
  const query = req.body.query;
  console.log(query);

  var result;
  var result1;
  var result2;

  var array = [];

  try {
    const regex = new RegExp(`${query}`, "i");
    result = await Book.find({
      title: { $regex: regex },
    });
    if (result !== undefined || null || NaN || "" || {} || []) {
      array = array.concat(result);
    }
    if (result === undefined || null || NaN || "" || {} || []) {
      result1 = await Book.find({
        author: { $regex: regex },
      });
      if (result1 !== undefined || null || NaN || "" || {} || []) {
        array = array.concat(result1);
      }
    }

    console.log(array);
    res.json({
      results: array,
    });
  } catch (err) {
    console.error(err);
    res.json({
      message: "Error",
      err: err,
      query: query,
    });
  }
});

router.get("/id/:bookId", async (req, res) => {
  try {
    const books = await Book.findById(req.params.bookId);
    res.json(books);
  } catch (err) {
    console.log(err, "error2");
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
    console.log(err, "error1");
    res.json({ message: err });
  }
});

router.patch("/id/:id", async (req, res) => {
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
    cover: req.body.cover,
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
