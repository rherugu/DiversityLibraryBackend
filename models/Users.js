const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  checkedOutBooks: {
    type: Array,
    required: false,
  },
});

module.exports = mongoose.model("Users", UserSchema);
