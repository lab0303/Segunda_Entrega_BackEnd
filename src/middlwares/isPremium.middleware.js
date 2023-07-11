const isPremium = (req, res, next) => {
  if (req.user && req.user.user.role === "premium") {
    next();
  } else {
    res.json({ error: "Acceso no autorizado" });
  }
};

module.exports = isPremium;
