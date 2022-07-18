const express = require("express");
const Exercises = require("../table_classes/exercises");
const Training = require("../table_classes/training");
const Users = require("../table_classes/users");
const Personalized_Exercises = require("../table_classes/personalized_exercises");

const router = express.Router();

router

.get("/", (req, res) => {
    res.render("new_schedule", {
        admin: req.session.adminSession ? true : false
    });
})

.post("/save", async (req, res) => {
    let responseData = {};
    responseData.missingExercises = [];
    responseData.result = false;

    let data = req.body;
    let date = data.date;
    let trainingName = data.trainingName;

    let name = data.user;
    let first_name = name.split(" ")[0];
    let surname = name.split(" ")[1];
    let user = new Users(first_name, surname);
    let user_id = await getUserID(user);
    if (!user_id) {
        responseData.user = name;
        res.json(responseData);
    }

    let training = new Training(trainingName, date, user_id);
    await training.safeData();
    let training_id = await training.getTrainingId();
    responseData.training_id = training_id;

    let exerciseData = data.exerciseData;
    for (let dataSet of exerciseData) {
        let exerciseName = dataSet.exercise;
        let reps = dataSet.reps;
        let sets = dataSet.sets;
        let comment = dataSet.comment;

        let exercise = new Exercises(exerciseName);
        let exercise_id = await getExerciseID(exercise);
        if (!exercise_id) {
            responseData.missingExercises.push(exerciseName);
            continue;
        }

        let personalizedExercise = new Personalized_Exercises(exercise_id, user_id, reps, sets, comment, training_id);
        await personalizedExercise.safeData();
        responseData.result = true;
    }    

    res.json(responseData);
})

.post("/getexercises", async (req, res) => {
    let exercises = new Exercises();
    let responseData = await exercises.readData();
    res.json(responseData);
});

async function getUserID(user) {
    let response = await user.getUserIDFromName();
    if (response.length > 0) {    
        return response[0].user_id;
    } else return null;
}

async function getExerciseID(exercise) {
    let response = await exercise.getExerciseIdFromName();
    if (response.length > 0) {
        return response[0].exercise_id;
    } else return null;
}

module.exports = router;
