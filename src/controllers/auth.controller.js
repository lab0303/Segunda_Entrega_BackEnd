const { Router } = require("express");
const Users = require("../dao/models/User.model");
const router = Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email: email });
    if (!user) return res.json({ error: "User and password dont match" });
    if (user.password !== password)
      return res.json({ error: "User and password dont match" });
    const isAdmin =
      user.email === "adminCoder@coder.com" && user.password === "adminCod3r123"
        ? "admin"
        : "user";
    req.session.user = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: isAdmin,
    };
    res.json({ status: "success", message: "Sesion iniciada" });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.json({ error });
    res.redirect("/login");
  });
});

module.exports = router;
