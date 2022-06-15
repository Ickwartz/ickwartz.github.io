const express = require("express");
const morgan = require("morgan");
const path = require("path");
const routes = require("./javascript/modules/routes");

const app = express();

// arbeitslaptop
const root = "C:/Users/Schiffke/Documents/Ausbildung/Praxis/HiDriveFE/WebsiteErika2/"
// home laptop
// const root = ""

app
    .use(morgan("dev"))

    .set("view engine", "pug")
    // eslint-disable-next-line no-undef
    .set("views", path.join(__dirname, "views"))

    .use("/", routes)
  
    // own css
    .use(
        "/css",
        // eslint-disable-next-line no-undef
        express.static(path.join(__dirname, "css"))
    )
    
    // images
    .use(
        "/img",
        // eslint-disable-next-line no-undef
        express.static(path.join(__dirname, "img"))
    )

    // bootstrap css
    .use(
        "/css",
        express.static(root + "node_modules/bootstrap/dist/css")
    )

    // bootstrap js
    .use(
        "/js",
        express.static(root + "node_modules/bootstrap/dist/js")
    )

    // bootstrap jquery
    .use(
        "/js",
        express.static(root + "node_modules/jquery/dist")
    )

module.exports = app