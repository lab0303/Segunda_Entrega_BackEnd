const cartsController = require("../controllers/carts.controller");
const productsController = require("../controllers/products.controller");
const listaCarts = require("../carts/listaCarts");
const usersController = require("../controllers/users.controller");
const viewTemplateController = require("../controllers/viewTemplate.controller");
const authController = require("../controllers/auth.controller");
const mockingController = require("../controllers/mocking.controller");
const loggerTestController = require("../controllers/logger.controller");

const router = (app) => {
  app.use("/api/carts", cartsController);
  app.use("/api/products", productsController);
  app.use("/api/users", usersController);
  app.use("/auth", authController);
  app.use("/carts", listaCarts);
  app.use("/", viewTemplateController);
  app.use("/mockingproducts", mockingController);
  app.use("/loggerTest", loggerTestController);
};

module.exports = router;
