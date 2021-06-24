const express = require("express");
const router = express.Router();
const User = require("../models/Users.js");
const verify = require("./verifyToken");

const { registerValidation } = require("./validation.js");

const bcrypt = require("bcryptjs");

router.get("/", verify, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.id },
      {
        $push: {
          checkedOutBooks: req.body.checkedOutBooks,
        },
      }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  // VAILDATION
  const { error } = registerValidation(req.body);
  if (error) return res.send(error.details[0].message);

  //Checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.send("Email already exists. Please choose a different email.");

  //Hashing of the passwords
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  var CheckedOutBooks = req.body.checkedOutBooks;
  if (CheckedOutBooks === null || CheckedOutBooks === undefined) {
    CheckedOutBooks = [];
  }
  const user = new User({
    email: req.body.email,
    password: hashedPassword,
    fname: req.body.fname,
    lname: req.body.lname,
    checkedOutBooks: CheckedOutBooks,
  });

  try {
    const savedUser = await user.save();
    res.json({ savedUser, message: "Success!", check: 200 });
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/userid/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    res.json(user);
  } catch (err) {
    res.json({ message: err, failed: "COULD NOT FIND USER" });
  }
});

module.exports = router;
