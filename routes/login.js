const express = require("express");

const router = express.Router();

const Users = require("../models/Users");

const { LoginValidation } = require("./validation.js");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { error } = LoginValidation(req.body);

  if (error) {
    console.log("errorValidation: ", error);
    return res.status(404).send(error.details[0].message);
  }
  try {
    const user = await Users.findOne({ email: req.body.email });

    if (!user) return res.status(404).send("Email or password is invalid.");

    const { email, password, fname, lname, _id } = user;
    const validPass = await bcrypt.compare(req.body.password, password);

    if (!validPass)
      return res.status(404).send("Email or password is invalid.");

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.json({
      status: "success",
      "auth-token": token,
      id: _id,
    });
  } catch (err) {
    console.log("Error: ", err);
  }
});

module.exports = router;
