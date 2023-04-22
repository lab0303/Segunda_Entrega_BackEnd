const cartsController = require("../controllers/carts.controller");
const productsController = require("../controllers/products.controller");
const listaCarts = require("../carts/listaCarts");
const usersController = require("../controllers/users.controller");
const viewTemplateController = require("../controllers/viewTemplate.controller");
const authController = require("../controllers/auth.controller");

const router = (app) => {
  app.use("/api/carts", cartsController);
  app.use("/api/products", productsController);
  app.use("/auth", authController);
  app.use("/carts", listaCarts);
  app.use("/users", usersController);
  app.use("/", viewTemplateController);
};

module.exports = router;
