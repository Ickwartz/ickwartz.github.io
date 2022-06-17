const express = require("express");
const p_e = require("../table_classes/personalized_exercises");

const router =  express.Router();

router.get("/", (req, res) => {
    let p_e_instance = new p_e();
    p_e_instance.innerJoinExercises().then((data) => {
        res.render("training_schedule", {
            items: data
        });
    });
});

module.exports = router;
