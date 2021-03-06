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
    try {   
        await exercise_api.updateExercise(exercise.exercise_id);
    } catch (error) {
        logger.systemLogger.error(error);
        res.status = 500;
        res.send();
    }
    res.send({ok: "OK"});
});

module.exports = router;