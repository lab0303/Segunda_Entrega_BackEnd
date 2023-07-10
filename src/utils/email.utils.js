const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "luisbeltran0303@gmail.com",
    pass: "zwbdzkkjxxujjrln",
  },
});

module.exports = transport;
