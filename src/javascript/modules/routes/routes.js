const express = require("express");
const router = express.Router();

const training_schedule = require("./schedule_route");
const login = require("./login_route");

router.get("/", (req, res) => {
    res.render("index", {
        //vars
    });
});

router.get("/about", (req, res) => {
    res.render("about", {
        //vars
    });
});

router.get("/training", (req, res) => {
    res.render("training", {
        //vars
    });
});

router.use("/training/trainingsplan", training_schedule);

router.use("/login", login);

router.get("/register", (req, res) => {
    res.render("register", {
        //vars
    });
});


module.exports = router;