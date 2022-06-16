const express = require("express");
const morgan = require("morgan");
const path = require("path");
const routes = require("./javascript/modules/routes/routes");

const app = express();

app
    .use(morgan("dev"))

    .set("view engine", "pug")
    .set("views", path.join(__dirname, "views"))

    .use("/", routes)
  
    .use(
        "/css",
        express.static(path.join(__dirname, "css"))
    )
    
    .use(
        "/img",
        express.static(path.join(__dirname, "img"))
    );

module.exports = app;