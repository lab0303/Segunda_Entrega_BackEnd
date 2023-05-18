const { Router, response } = require("express");
const Users = require("../dao/models/User.model");
const { isValidPassword } = require("../utils/cryptPassword.utils");
const passport = require("passport");
const generateToken = require("../utils/jwt.utils");
const router = Router();

router.post(
  "/",
  //passport.authenticate("login", { failureRedirect: "/auth/faillogin" }),
  async (req, res) => {
    // con session
    /*try {
      if (!req.user)
        return res
          .status(400)
          .json({ message: "Usuario y password no coinciden" });
      const password = "adminCod3r123";
      const isAdmin =
        req.user.email === "adminCoder@coder.com" &&
        isValidPassword(password, req.user)
          ? "admin"
          : "user";
      req.session.user = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        role: isAdmin,
      };
      res.json({ status: "success", message: "Sesion iniciada" });
    } catch (error) {
      console.log(error.message);
    }*/
    // con jwt
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });

      if (!user)
        return res.json({ error: "Username and password do not match" });

      if (!isValidPassword(password, user))
        return res.json({ error: "Username and password do not match" });
      const token = generateToken({ firstName: user.firstName, email });
      res
        .cookie("authtoken", token, { maxAge: 10000 })
        .json({ message: "Sesion iniciada" });
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }
);
router.get("/faillogin", (req, res) => {
  console.log("Fallo el registro");
  res.json({ error: "Failed register" });
});

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.json({ error });
    res.redirect("/login");
  });
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
