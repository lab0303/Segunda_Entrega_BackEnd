const cartsController = require("../controllers/carts.controller");
const productsController = require("../controllers/products.controller");
const listaProducts = require("../products/listaProducts");
const listaCarts = require("../carts/listaCarts");

const router = (app) => {
  app.use("/api/carts", cartsController);
  app.use("/api/products", productsController);
  app.use("/products", listaProducts);
  app.use("/carts", listaCarts);
};

module.exports = router;
