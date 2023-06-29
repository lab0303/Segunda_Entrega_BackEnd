const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  req.logger.fatal("Error en el sistema");
});

module.exports = router;
