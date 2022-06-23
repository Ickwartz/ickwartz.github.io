const Exercise = require("../table_classes/exercises");
const express = require("express");

const router = express.Router();

router

.get("/", (req, res) => {
    res.render("new_exercise", {

    });
})

.post("/safe", (req, res) => {
    let data = req.body;
    data.forEach(element => {
        let exercise = new Exercise(element.name, element.description);
        exercise.safeData();
    });
});

module.exports = router;
