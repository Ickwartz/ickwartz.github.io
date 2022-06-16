const express = require("express");
const router = express.Router();

const test_router = require("./test_route")

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

router.use("/training/test", test_router);

router.get("/login", (req, res) => {
    res.render("login", {
        //vars
    });
});

router.get("/register", (req, res) => {
    res.render("register", {
        //vars
    });
});


module.exports = router;