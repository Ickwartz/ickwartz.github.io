const Training = require("../table_classes/training");
const express = require("express");

const router = express.Router();

const training_schedule = require("./schedule_route");

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


.use("/training/trainingsplan", training_schedule);



module.exports = router;
