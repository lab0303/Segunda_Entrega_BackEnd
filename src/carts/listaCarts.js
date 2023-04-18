const { Router } = require("express");
const Carts = require("../dao/models/Carts.model");
const router = Router();

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Carts.findOne({ _id: cid }).lean();
    let carts = cart.products;
    carts = carts.map((product) => {
      return product.product;
    });
    res.render("carts", { carts });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
