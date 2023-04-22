function publicSession(req, res, next) {
  if (req.session.user) return res.redirect("/products");
  next();
}

module.exports = publicSession;
