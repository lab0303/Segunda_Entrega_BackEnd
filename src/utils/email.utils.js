const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: `${process.env.USER_EMAIL}`,
    pass: `${process.env.USER_PASS}`,
  },
});

module.exports = transport;
