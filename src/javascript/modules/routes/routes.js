const express = require("express");
const router = express.Router();

const training_schedule = require("./schedule_route");
const login = require("./login_route");
const logout = require("./logout_route");
const register = require("./register_route");
const new_exercise = require("./new_exercise");

router

    .get("/", (req, res) => {
        res.render("index", {
            //vars
        });
    })

    .get("/about", (req, res) => {
        res.render("about", {
            //vars
        });
    })

    .get("/training", (req, res) => {
        res.render("training", {
            //vars
        });
    })

    .use("/newexercise", new_exercise)

    .use("/training/trainingsplan", training_schedule)

    .use("/login", login)

    .use("/logout", logout)

    .use("/register", register);


module.exports = router;