const bcrypt = require("bcrypt");

const createHash = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const passEncrypted = bcrypt.hashSync(password, salt);
  return passEncrypted;
};

const isValidPassword = (password, user) => {
  const isValid = bcrypt.compareSync(password, user.password);
  return isValid;
};

module.exports = {
  createHash,
  isValidPassword,
};
