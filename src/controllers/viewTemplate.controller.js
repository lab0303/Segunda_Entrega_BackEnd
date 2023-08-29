const { Router } = require("express");
const Products = require("../dao/models/Products.model");
const publicSession = require("../middlwares/public.middleware");
const passportCall = require("../utils/passportCall.utils");
const isAdmin = require("../middlwares/isAdmin.middleware");
const Users = require("../dao/models/User.model");
//const UsersDAO = require("../dao/Users.Dao");
const router = Router();
//const Users = new UsersDAO();

router.get("/register", publicSession, (req, res) => {
  res.render("register");
});

router.get("/login", publicSession, (req, res) => {
  res.render("login");
});

router.get("/reset-password", publicSession, (req, res) => {
  res.render("resetPass");
});

router.get("/admin", passportCall("current"), isAdmin, async (req, res) => {
  try {
    const users = await Users.find().lean();
    console.log(req.user.user);
    res.render("users", { users });
  } catch (error) {
    console.log(error);
  }
});

router.get("/current", passportCall("current"), async (req, res) => {
  try {
    const { user } = req.user;
    const products = await Products.find().lean();
    console.log(products, user);
    res.render("products", { products, user });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
