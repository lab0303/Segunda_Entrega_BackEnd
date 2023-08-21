const { Router, response } = require("express");
const { isValidPassword } = require("../utils/cryptPassword.utils");
const passport = require("passport");
const generateToken = require("../utils/jwt.utils");
const UsersDAO = require("../dao/Users.Dao");
const router = Router();

const Users = new UsersDAO();
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findUser(email);

    if (!user) return res.json({ error: "Username and password do not match" });

    if (!isValidPassword(password, user))
      return res.json({ error: "Username and password do not match" });
    const token = generateToken({
      id: user._id,
      firstName: user.firstName,
      email,
      role: user.role,
      cartId: user.cartId,
    });
    user.last_connection = new Date();
    user.save();
    res
      .cookie("authtoken", token, { maxAge: 10000000 })
      .json({ message: "Sesion iniciada", token });
  } catch (error) {
    console.log(error);
  }
});
router.get("/faillogin", (req, res) => {
  console.log("Fallo el registro");
  res.json({ error: "Failed register" });
});

router.get("/logout", (req, res) => {
  res.cookie("authtoken", "", { expires: new Date(0) }).redirect("/login");
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = {
      ...req.user,
      role: "user",
    };
    console.log(req.session.user);
    res.redirect("/products");
  }
);

module.exports = router;
