const express = require("express");
const morgan = require("morgan");
const routes = require("./modules/routes");

const app = express();

// arbeitslaptop
const root = "C:/Users/Schiffke/Documents/Ausbildung/Praxis/HiDriveFE/WebsiteErika2/"
// home laptop
// const root = ""

app
    .use(morgan("dev"))
    .use("/", routes)
    // bootstrap css
    .use(
        "/css",
        express.static(root + "node_modules/bootstrap/dist/css")
    )
        
    // own css
    .use(
        "/css",
        express.static(root + "src/html/css")
    )

    // own js
    .use(
        "/js",
        express.static(root + "src/javascript/dom_manipulation")
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

    // images
    .use(
        "/img",
        express.static(root + "src/img")
    )

module.exports = app