const { Router } = require("express");
const passport = require("passport");
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
      res
        .status(201)
        .json({ status: "success", message: "Usuario registrado" });
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
