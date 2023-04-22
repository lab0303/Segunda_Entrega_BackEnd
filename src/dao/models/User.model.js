const mongoose = require("mongoose");

const collectionName = "user";
const collectionSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  age: Number,
  password: String,
});

const Users = mongoose.model(collectionName, collectionSchema);

module.exports = Users;
