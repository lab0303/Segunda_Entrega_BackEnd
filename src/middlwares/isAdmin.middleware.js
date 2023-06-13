const isAdmin = (req, res, next) => {
  if (req.user && req.user.user.role === "admin") {
    next();
  } else {
    res.json({ error: "Acceso no autorizado" });
  }
};

module.exports = isAdmin;
