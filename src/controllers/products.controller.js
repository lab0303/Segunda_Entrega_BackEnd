const { Router } = require("express");
const Products1 = require("../dao/models/Products.model");
const ProductsDAO = require("../dao/Products.Dao");

const router = Router();

const Products = new ProductsDAO();

router.get("/", async (req, res) => {
  try {
    const { limit = 20, page = 1, sort, category } = req.query;
    console.log(req.query);
    const sortPrice = {};
    if (sort === "asc") sortPrice.price = 1;
    if (sort === "desc") sortPrice.price = -1;

    const query = {};
    if (category) query.category = category.toLocaleLowerCase();

    const products = await Products1.paginate(query, {
      limit,
      page,
      sort: sortPrice,
    });
    res.json({ message: products });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await Products.getProduct(pid);
    res.json({ message: product });
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
    Products.addProduct(newProductInfo);
    res.json({ message: newProductInfo });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await Products.deleteProduct(pid);
    res.json({ message: product });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
