const express = require("express");
const session = require('express-session');
const path = require("path");
const routes = require("./javascript/modules/routes/routes");
const morgan = require("../utils/morganMiddleware");
const logger = require("../utils/winstonLogger");

const app = express();

// general App Configuration
app
    .use(morgan)
    // Log requests
    /*.use((req, res, next) => {
        logger.serverLogger.info(`${req.originalUrl}: ${req.method} ${res.statusCode}`);
        next();
    })
    */
    .set("view engine", "pug")
    .set("views", path.join(__dirname, "views"))

    .use(session({
        secret: "wubalubadubdub",
        resave: true,   // reactivate old session
        saveUninitialized: true, // helps identify revisiting users
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
    )

    // Logger Configuration, dont put pages after that
    
    .use((err, req, res, next) => {
        res.status(500).send("Server Error");
        logger.systemLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    })
    
    .use((req, res, next) => {
        res.status(400).send("PAGE NOT FOUND");
        logger.serverLogger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    });
    
module.exports = app;