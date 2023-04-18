const mongoose = require("mongoose");

const collectionName = "cart";

const collectionSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    default: [],
  },
});

collectionSchema.pre("find", function () {
  this.populate("products.product");
});

collectionSchema.pre("findOne", function () {
  this.populate("products.product");
});
const Carts = mongoose.model(collectionName, collectionSchema);

module.exports = Carts;
