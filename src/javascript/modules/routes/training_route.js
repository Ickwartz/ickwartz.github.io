const Training = require("../table_classes/training");
const PersonalizedExercises = require("../table_classes/personalized_exercises");
const express = require("express");
const logger = require("@logger");

const router = express.Router();

router

.get("/", (req, res) => {
    res.render("training", {
        loggedin: req.session.loggedin ? true : false
    });
})

.post("/get_user_trainings", async (req, res) => {
    let data = req.body;
    let user_id = req.session.userInfo.user_id;

    let training_interface = new Training("", "", user_id);
    try {
        let response_data = await training_interface.getAllUserTrainingMonth(data.params.month, data.params.year);
        res.set("Content-Type", "application/json");
        res.json(response_data);
    } catch (error) {
        res.statusCode = 500;
        res.send();
        logger.systemLogger.error(`${error}, caught in training_route /get_user_trainings`);
    }
})

.post("/getTraining", async (req, res) => {
    let training_id = req.body.training_id;
    let p_e_instance = new PersonalizedExercises();
    try {
        let responseData = await p_e_instance.innerJoinExercises(training_id);
        res.set("Content-Type", "application/json");
        res.json(responseData);
    } catch (error) { 
        res.statusCode = 500;
        res.send();
        logger.systemLogger.error(`${error}, caught in training_route /gettraining`);
    }
})

.post("/saveUserNotes", async (req, res) => {
    let data = req.body;
    let training_api = new Training();
    training_api.saveUserNotes(data.training_id, data.user_notes).then(() => {
        res.statusCode = 204;
        res.send();
    }).catch(error => {
        res.statusCode = 500;
        res.send();
        logger.systemLogger.error(`${error}, caught in training_route /saveTrainingComment`);
    });
})

.post("/loadUserNotes", async (req,res) => {
    let id = req.body.training_id;
    let training_api = new Training();
    training_api.loadUserNotes(id).then((result) => {
        res.set("Content-Type", "application/json");
        res.json(result[0]);
    }).catch(error => {
        res.statusCode = 500;
        res.send();
        logger.systemLogger.error(`${error}, caught in training_route /loadTrainingComment`);
    });
});

module.exports = router;
