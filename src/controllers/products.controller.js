const { Router } = require("express");
const Products = require("../dao/models/Products.model");
const router = Router();
const passport = require("passport");

router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, category } = req.query;
    console.log(req.query);
    const sortPrice = {};
    if (sort === "asc") sortPrice.price = 1;
    if (sort === "desc") sortPrice.price = -1;

    const query = {};
    if (category) query.category = category.toLocaleLowerCase();

    const products = await Products.paginate(query, {
      limit,
      page,
      sort: sortPrice,
    });
    res.json({ message: products });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", (req, res) => {
  try {
    const { name, price, category, stock } = req.body;
    const newProductInfo = {
      name,
      price,
      category: category.toLowerCase(),
      stock,
    };
    Products.create(newProductInfo);
    res.json({ message: newProductInfo });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
