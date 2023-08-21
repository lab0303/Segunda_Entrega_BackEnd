const { Router } = require("express");
const passport = require("passport");
const UsersDAO = require("../dao/Users.Dao");
const transport = require("../utils/email.utils");
const passportCall = require("../utils/passportCall.utils");
const uploader = require("../utils/multer.utils");

const router = Router();

const Users = new UsersDAO();

router.get("/", async (req, res) => {
  const users = await Users.findUsers();
  const userInfo = users.map((user) => {
    return {
      name: user.firstName + " " + user.lastName,
      email: user.email,
      role: user.role,
    };
  });
  console.log(users);
  res.json({ userInfo });
});

router.post(
  "/",
  passport.authenticate("register", { failureRedirect: "/users/failregister" }),
  async (req, res) => {
    try {
      req.logger.info("Usuario creado");
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

router.get("/email", passportCall("current"), async (req, res) => {
  console.log("desde el email", req.user);
  let result = await transport.sendMail({
    from: "luisbeltran0303@gmail.com",
    to: req.user.user.email,
    subject: "Reset Password",
    html: `<div>
    <h1>Hola ${req.user.user.firstName}</h1>
    <p>Click en el boton de abajo para resetear tu password</p>
    <a href="http://localhost:8080/reset-password">Redirect</a>
  </div>`,
  });
  res.json({ message: "Email send" });
});

router.put("/premium/:uid", async (req, res) => {
  const { uid } = req.params;
  const user = await Users.findUserById(uid);
  if (user.role === "user") {
    user.role = "premium";
  } else if (user.role === "premium") {
    user.role = "user";
  }
  await user.save();
  console.log(user);
  res.json({ message: "Rol cambiado" });
});

router.post("/:uid/documents", uploader.single("file"), (req, res) => {
  const uid = req.params.uid;
  res.json({ message: "Archivo guardado" });
});

router.delete("/", async (req, res) => {
  const users = await Users.findUsers();
  const currentDate = new Date();
  const timeInterval = 2 * 24 * 60 * 60 * 1000;
  const inactives = users
    .filter((user) => currentDate - user.last_connection > timeInterval)
    .map((user) => {
      return {
        id: user._id,
        name: user.firstName,
        email: user.email,
      };
    });
  inactives.forEach((user) => {
    let result = transport.sendMail({
      from: "luisbeltran0303@gmail.com",
      to: user.email,
      subject: "Eliminacion de cuenta",
      html: `<div>
      <h1>Hola ${user.name}</h1>
      <h3>Su cuenta ha sido eliminada por estar inactiva</h3>
      
    </div>`,
    });
    Users.deleteUser(user.id);
  });
  res.json({ message: "eliminando usuarios" });
});

module.exports = router;
