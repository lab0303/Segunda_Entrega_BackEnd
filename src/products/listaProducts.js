const { Router } = require("express");
const Products = require("../dao/models/Products.model");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await Products.find().lean();
    res.render("products", { products });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
