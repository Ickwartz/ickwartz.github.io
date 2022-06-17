const express = require("express");
const session = require('express-session');
const morgan = require("morgan");
const path = require("path");
const routes = require("./javascript/modules/routes/routes");

const app = express();

app
    .use(morgan("dev"))

    .set("view engine", "pug")
    .set("views", path.join(__dirname, "views"))

    // test env
    .use(session({
        secret: "wubalubadubdub",
        resave: true,   // reactivate old session
        saveUninitialized: true // helps identify revisiting users
    }))

    .use(express.json())
    .use(express.urlencoded({extended: true}))

    //.use(express.cookieParser())
    // enable pug to access session vars
    .use(function(req,res,next){
        res.locals.session = req.session;
        next();
    })

    // test env
    .use("/", routes)
  
    .use(
        "/css",
        express.static(path.join(__dirname, "css"))
    )
    
    .use(
        "/img",
        express.static(path.join(__dirname, "img"))
    )

    .use(
        "/js",
        express.static(path.join(__dirname, "javascript/client-side"))
    );

module.exports = app;