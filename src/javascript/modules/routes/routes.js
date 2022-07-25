const express = require("express");
const router = express.Router();

const login = require("./login_route");
const logout = require("./logout_route");
const register = require("./register_route");
const exercises = require("./new_exercises_route");
const training = require("./training_route");
const new_schedule = require("./new_schedule_route");

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

    .use("/newexercise", exercises)

    .use("/newschedule", new_schedule)

    .use("/training", training)

    .use("/login", login)

    .use("/logout", logout)

    .use("/register", register);


module.exports = router;