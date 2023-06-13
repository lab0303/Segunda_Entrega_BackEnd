const mongoose = require("mongoose");

const collectionName = "ticket";

const collectionSchema = new mongoose.Schema({
  code: String,
  purchase_datetime: {
    type: Date,
    default: Date.now(),
  },
  amount: Number,
  purchaser: String,
});

const Tickets = mongoose.model(collectionName, collectionSchema);

module.exports = Tickets;
