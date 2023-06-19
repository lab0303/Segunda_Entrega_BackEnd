const EnumErrors = require("../../handlers/errors/enums");

const errorHandler = (error, req, res, next) => {
  console.log(error.cause);
  switch (error.code) {
    case EnumErrors.INVALID_TYPE_ERROR:
      res.json({ status: "Error", error: error.name });
      break;

    default:
      res.json({ status: "error", error: "Unhandled error" });
      break;
  }
};

module.exports = errorHandler;
