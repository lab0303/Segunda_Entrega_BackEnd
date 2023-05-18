const jwt = require("jsonwebtoken");

const PrivateKey = "luis0303";

const generateToken = (user) => {
  const token = jwt.sign({ user }, PrivateKey, { expiresIn: "1d" });

  return token;
};

module.exports = generateToken;
