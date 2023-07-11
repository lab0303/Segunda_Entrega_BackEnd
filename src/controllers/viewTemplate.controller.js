const { Router } = require("express");
const Products = require("../dao/models/Products.model");
const publicSession = require("../middlwares/public.middleware");
const passportCall = require("../utils/passportCall.utils");
const router = Router();

router.get("/register", publicSession, (req, res) => {
  res.render("register");
});

router.get("/login", publicSession, (req, res) => {
  res.render("login");
});

router.get("/reset-password", publicSession, (req, res) => {
  res.render("resetPass");
});

router.get("/current", passportCall("current"), async (req, res) => {
  try {
    const { user } = req.user;
    const products = await Products.find().lean();
    res.render("products", { products, user });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
