/* eslint-disable no-unused-vars */
const express = require("express");
const session = require('express-session');
const sqliteStoreFactory = require("express-session-sqlite").default;
const sqlite3 = require("sqlite3");
const path = require("path");
const routes = require("./javascript/modules/routes/routes");
const morgan = require("../utils/morganMiddleware");
const logger = require("../utils/winstonLogger");

const SqliteStore = sqliteStoreFactory(session);
const app = express();

const store = new SqliteStore({
    driver: sqlite3.Database,
    path: "./src/database/session_db.db",
    ttl: 1000 * 3600 * 24,  // 1d
    prefix: "sess",
    cleanupInterval: 900000 // 15min
});

// general App Configuration
app
    .use(morgan)

    .set("view engine", "pug")
    .set("views", path.join(__dirname, "views"))

    .use(session({
        store: store,
        secret: "wubalubadubdub",
        cookie: {maxAge: 1000 * 3600 * 24}, // 1d
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