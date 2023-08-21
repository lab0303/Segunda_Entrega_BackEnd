const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const session = require("express-session");
const MongoStore = require("connect-mongo");

const mongoConnect = require("../db");
const router = require("./router");
const initializePassport = require("./config/passport.config");
const errorHandler = require("./middlwares/error");
const addLogger = require("./middlwares/logger.middleware");

const handlebars = require("express-handlebars");
//const swaggerOptions = require("./utils/swagger.utils");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUiExpress = require("swagger-ui-express");
const port = process.env.PORT || 8080;
const app = express();

app.use(addLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://lab0303:lab0303@cluster0.pqdbvwm.mongodb.net/coderSessions?retryWrites=true&w=majority",
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: "coderSecret",
    resave: false,
    saveUninitialized: false,
  })
);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

mongoConnect();

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documento API",
      description: "Metodos para trabajar con la API",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};
const specs = swaggerJSDoc(swaggerOptions);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

router(app);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Servidor listening on port 8080");
});
