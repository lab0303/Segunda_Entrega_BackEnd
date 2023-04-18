const express = require("express");
const mongoConnect = require("../db");
const router = require("./router");

const handlebars = require("express-handlebars");
const port = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

mongoConnect();

router(app);

app.listen(port, () => {
  console.log("Servidor listening on port 8080");
});
