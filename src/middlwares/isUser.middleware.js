const isUser = (req, res, next) => {
  if (req.user && req.user.user.role === "user") {
    next();
  } else {
    res.json({ error: "Acceso no autorizado" });
  }
};

module.exports = isUser;
