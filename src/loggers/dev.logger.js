const winston = require("winston");
const loggerCustomeLevels = require("../utils/loggerCustomeLevels");

const logger = winston.createLogger({
  levels: loggerCustomeLevels.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ colors: loggerCustomeLevels.colors }),
        winston.format.simple()
      ),
    }),
  ],
});

module.exports = logger;
