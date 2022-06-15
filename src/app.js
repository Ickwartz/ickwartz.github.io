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
    
    // images
    .use(
        "/img",
        express.static(root + "src/img")
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