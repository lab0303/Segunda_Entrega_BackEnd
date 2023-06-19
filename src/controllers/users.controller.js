const { Router } = require("express");
const passport = require("passport");
const generateToken = require("../utils/jwt.utils");
const UsersDAO = require("../dao/Users.Dao");
const UserDTO = require("../dto/user.dto");
const router = Router();

const Users = new UsersDAO();

router.get("/", async (req, res) => {
  const users = await Users.findUsers();
  res.json({ users });
});

router.post(
  "/",
  passport.authenticate("register", { failureRedirect: "/users/failregister" }),
  async (req, res) => {
    try {
      const user = new UserDTO(req.user);
      const token = generateToken({ email: user.email });
      res
        .status(201)
        .json({ status: "success", message: "Usuario registrado", user });
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
