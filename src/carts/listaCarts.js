const { Router } = require("express");
const Carts = require("../dao/models/Carts.model");
const router = Router();

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Carts.findOne({ _id: cid }).lean();
    let carts = cart.products;
    cartsDetail = carts.map((item) => {
      return {
        name: item.product.name,
        price: item.product.price,
        category: item.product.category,
        quantity: item.quantity,
      };
    });
    res.render("carts", { cartsDetail });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
