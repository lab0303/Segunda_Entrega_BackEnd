const { Router } = require("express");
const Products = require("../dao/models/Products.model");
const publicSession = require("../middlwares/public.middleware");
const router = Router();
const passport = require("passport");
const passportCall = require("../utils/passportCall.utils");

router.get("/register", publicSession, (req, res) => {
  res.render("register");
});

router.get("/login", publicSession, (req, res) => {
  res.render("login");
});

router.get("/products", passportCall("current"), async (req, res) => {
  try {
    const { user } = req.user;
    const products = await Products.find().lean();
    res.render("products", { products, user });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
