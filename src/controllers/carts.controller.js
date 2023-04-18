const { Router } = require("express");
const router = Router();
const Carts = require("../dao/models/Carts.model");

router.get("/", async (req, res) => {
  try {
    const carts = await Carts.find();
    res.json({ carts });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Carts.findOne({ _id: cid });
    res.json({ cart });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const cart = await Carts.create({});
    res.json({ cart });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = await Carts.findOne({ _id: cid });
    const productIndex = cart.products.findIndex(
      (product) => product._id.toString() === pid
    );

    if (productIndex === -1) {
      return res.json({ message: "Producto no encontrado en carrito" });
    }
    cart.products[productIndex].quantity = quantity;
    const response = await Carts.updateOne({ _id: cid }, cart);
    res.json({ response });
  } catch (error) {
    console.log(error);
  }
});

router.patch("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const { product } = req.body;
    const cart = await Carts.findOne({ _id: cid });
    cart.products.push({ product });
    const response = await Carts.updateOne({ _id: cid }, cart);
    res.json({ message: response });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Carts.findOne({ _id: cid });
    cart.products = [];
    const response = await Carts.updateOne({ _id: cid }, cart);
    res.json({ message: response });
  } catch (error) {
    console.log(error);
  }
});
router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await Carts.findOne({ _id: cid });
    cart.products = cart.products.filter(
      (product) => product._id.toString() !== pid
    );
    const response = await Carts.updateOne({ _id: cid }, cart);
    res.json({ message: response });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
