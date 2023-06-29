const appConfig = require("../config/app.config");

async function getLogger() {
  switch (appConfig.environment) {
    case "development":
      return require("./dev.logger");
    case "production":
      return require("./prod.logger");
  }
}

module.exports = getLogger;
