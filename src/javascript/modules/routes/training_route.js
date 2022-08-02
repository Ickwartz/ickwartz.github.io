const Training = require("../table_classes/training");
const PersonalizedExercises = require("../table_classes/personalized_exercises");
const express = require("express");
const logger = require("@logger");

const router = express.Router();

router

.get("/", (req, res) => {
    res.render("training", {
        loggedin: true  //req.session.loggedin ? true : false
    });
})

.post("/get_user_trainings", async (req, res) => {
    let data = req.body;
    let user_id = 1; //req.session.userInfo.user_id;

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

/*
.get("/trainingsplan", (req, res) => {
    let training_id = req.query.trainingid;
    let p_e_instance = new PersonalizedExercises();
    p_e_instance.innerJoinExercises(training_id).then((data) => {
        
        res.render("training_schedule", {
            items: data,
            loggedin: req.session.loggedin ? true : false
        });
        
       res.statusCode = 204;
       res.json(data);
    }).catch((error) => { 
        res.statusCode = 500;
        res.send();
        logger.systemLogger.error(`${error}, caught in functionality_routes /getexercises`);
    });
});
*/
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
        logger.systemLogger.error(`${error}, caught in functionality_routes /getexercises`);
    }
});

module.exports = router;
