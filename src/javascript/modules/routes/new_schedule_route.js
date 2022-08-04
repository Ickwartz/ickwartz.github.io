const express = require("express");
const Training = require("../table_classes/training");
const Users = require("../table_classes/users");
const Personalized_Exercises = require("../table_classes/personalized_exercises");
const logger = require("@logger");

const router = express.Router();

router

.get("/", (req, res) => {
    res.render("new_schedule", {
        admin: true // req.session.adminSession ? true : false
    });
})

.post("/save", async (req, res) => {
    try {
        let responseData = {};
        responseData.missingExercises = [];
        responseData.result = false;

        let data = req.body;
        let date = data.date;       // for (let date of dates)
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
        let update = await training.trainingExists();
        if (!update) await training.safeData();
        
        let training_response = await training.getTrainingId();
        let training_id = training_response[0].training_id;

        responseData.training_id = training_id;

        let exerciseData = data.exerciseData;
        for (let dataSet of exerciseData) {
            let exercise_id = dataSet.exercise_id;
            let reps = dataSet.reps;
            let sets = dataSet.sets;
            let comment = dataSet.comment;
            let personalizedExercise = new Personalized_Exercises(exercise_id, user_id, reps, sets, comment, training_id);
            if (update) {
                await personalizedExercise.deleteTrainingData();
                update = false;
            }
            await personalizedExercise.safeData();
            responseData.result = true;     
        }
        res.json(responseData);
    } catch (error) {
        res.statusCode = 500;
        res.send();
        logger.systemLogger.error(`${error} | caught in new_schedule_route /save`);        
    }
    
})

.post("/getschedules", async (req, res) => {
    try {
        let data = req.body;
        let date = data.date;
        let first_name = data.first_name;
        let surname = data.surname;
        
        let user = new Users(first_name, surname);
        let user_id = await user.getUserIDFromName();
        user_id = user_id[0].user_id;
        let training_api = new Training("", "", user_id);
        let trainings = await training_api.getTrainingsOfDay(date);
        res.json(trainings);
    } catch (error) {
        res.statusCode = 500;
        res.send();
        logger.systemLogger.error(`${error} | caught in new_schedule_route /getschedules`);
    }
})

.post("/loadschedule", async (req, res) => {
    try {
        let data = req.body;
        let pe_api = new Personalized_Exercises();
        let id = data.training_id;
        let schedule = await pe_api.getExercisesWithTrainingId(id);
        res.json(schedule);
    } catch (error) {
        res.statusCode = 500;
        res.send();
        logger.systemLogger.error(`${error} | caught in new_schedule_route /loadschedule`);
    }
});

async function getUserID(user) {
    let response = await user.getUserIDFromName();
    if (response.length > 0) {    
        return response[0].user_id;
    } else return null;
}

module.exports = router;
