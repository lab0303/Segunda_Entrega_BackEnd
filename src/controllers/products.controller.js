const { Router } = require("express");
const Products1 = require("../dao/models/Products.model");
const ProductsDAO = require("../dao/Products.Dao");
const isAdmin = require("../middlwares/isAdmin.middleware");
const passportCall = require("../utils/passportCall.utils");
const generateProductErrorInfo = require("../handlers/errors/info");
const CustomeError = require("../handlers/errors/CustomeError");
const EnumErrors = require("../handlers/errors/enums");

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
//passportCall("current"), isAdmin,
router.post("/", (req, res) => {
  const { name, price, category, stock } = req.body;
  if (!name || !price || !category || !stock) {
    CustomeError.createError({
      name: "Product creating error",
      cause: generateProductErrorInfo({ name, price, category, stock }),
      message: "Error trying to create product",
      code: EnumErrors.INVALID_TYPE_ERROR,
    });
  }
  const newProductInfo = {
    name,
    price,
    category: category.toLowerCase(),
    stock,
  };
  Products.addProduct(newProductInfo);
  res.json({ message: newProductInfo });
});

router.delete("/:pid", passportCall("current"), isAdmin, async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await Products.deleteProduct(pid);
    res.json({ message: product });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
