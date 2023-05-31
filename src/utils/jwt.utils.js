const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const token = jwt.sign({ user }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "1d",
  });

  return token;
};

module.exports = generateToken;
