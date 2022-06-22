const Exercises = require("../table_classes/exercises");
const express = require("express");

const router = express.Router();

router

.get("/", (req, res) => {
    res.render("new_exercise", {

    });
});

module.exports = router;
