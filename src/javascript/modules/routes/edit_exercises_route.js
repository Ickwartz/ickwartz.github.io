const express = require("express");
const logger = require("@logger");
const Exercises = require("../table_classes/exercises");

const router = express.Router();

router

.get("/", async (req, res) => {
    res.render("edit_exercises", {
        admin: req.session.adminSession ? true : false
    });
})

.post("/update", async (req, res) => {
    let exercise = req.body;
    let exercise_api = new Exercises(exercise.name, exercise.description);   
    exercise_api.updateExercise(exercise.exercise_id).then(() => {
        res.statusCode=204;
        res.send();
    }).catch(err => {
        logger.systemLogger.error(`${err} caught in edit_exercises_route.js /update`);
        res.statusCode = 500;
        res.send();
    });
});

module.exports = router;