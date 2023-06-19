const { Router } = require("express");
const generateProducts = require("../utils/faker.utils");

const router = Router();

router.get("/", (req, res) => {
  const result = generateProducts();
  res.json({ result });
});

module.exports = router;
