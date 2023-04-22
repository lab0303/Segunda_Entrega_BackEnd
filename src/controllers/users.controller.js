const { Router } = require("express");
const Users = require("../dao/models/User.model");
const router = Router();

router.get("/", async (req, res) => {
  const users = await Users.find();
  res.json({ users });
});

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, age, password } = req.body;
    const userInfo = {
      firstName,
      lastName,
      email,
      age,
      password,
    };
    const user = await Users.create(userInfo);
    res.status(201).json({ status: "success", message: user });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
