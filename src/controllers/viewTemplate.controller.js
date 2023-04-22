const { Router } = require("express");
const Products = require("../dao/models/Products.model");
const publicSession = require("../middlwares/public.middleware");
const privateSession = require("../middlwares/private.middleware");
const router = Router();

router.get("/register", publicSession, (req, res) => {
  res.render("register");
});

router.get("/login", publicSession, (req, res) => {
  res.render("login");
});

router.get("/products", privateSession, async (req, res) => {
  try {
    const { user } = req.session;
    const products = await Products.find().lean();
    res.render("products", { products, user });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
