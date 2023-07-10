const { Router } = require("express");
const passport = require("passport");
const generateToken = require("../utils/jwt.utils");
const UsersDAO = require("../dao/Users.Dao");
const UserDTO = require("../dto/user.dto");
const transport = require("../utils/email.utils");

const router = Router();

const Users = new UsersDAO();

router.get("/", async (req, res) => {
  const users = await Users.findUsers();
  req.logger.info(users);
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

router.get("/email", async (req, res) => {
  console.log("desde el email", req);
  let result = await transport.sendMail({
    from: "luisbeltran0303@gmail.com",
    to: "luis0303@yopmail.com",
    subject: "Reset Password",
    html: `<div>
    <h1>Hola</h1>
    <p>Click en el boton de abajo para resetear tu password</p>
    <a href="http://localhost:8080/mockingproducts">Redirect</a>
  </div>`,
  });
  res.json({ message: "Email send" });
});

module.exports = router;
