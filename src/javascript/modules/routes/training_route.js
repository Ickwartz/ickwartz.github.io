const Training = require("../table_classes/training");
const PersonalizedExercises = require("../table_classes/personalized_exercises");
const express = require("express");

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
    let response_data = await training_interface.getAllUserTrainingMonth(data.params.month, data.params.year);

    res.set("Content-Type", "application/json");
    res.json(response_data);
})


.get("/trainingsplan", (req, res) => {
    let training_id = req.query.trainingid;
    let p_e_instance = new PersonalizedExercises();
    p_e_instance.innerJoinExercises(training_id).then((data) => {
        res.render("training_schedule", {
            items: data,
            loggedin: req.session.loggedin ? true : false
        });
    });
});


module.exports = router;
