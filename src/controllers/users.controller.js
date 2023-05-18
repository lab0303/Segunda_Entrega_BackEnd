const { Router } = require("express");
const passport = require("passport");
const generateToken = require("../utils/jwt.utils");
const router = Router();

router.get("/", async (req, res) => {
  const users = await Users.find();
  res.json({ users });
});

router.post(
  "/",
  passport.authenticate("register", { failureRedirect: "/users/failregister" }),
  async (req, res) => {
    try {
      console.log(req.user);
      const token = generateToken({ email: req.user.email });
      res
        .status(201)
        .json({ status: "success", message: "Usuario registrado", token });
    } catch (error) {
      console.log(error);
    }
  }
);

router.get("/failregister", (req, res) => {
  console.log("Fallo el registro");
  res.json({ error: "Failed register" });
});

module.exports = router;
