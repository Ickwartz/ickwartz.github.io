const Exercise = require("../table_classes/exercises");
const express = require("express");

const router = express.Router();

router

.get("/", (req, res) => {
    res.render("new_exercise", {

    });
})

.post("/safe", async (req, res) => {
    let data = req.body;
    let response_data = [];
    await data.forEach(async element => {
        let exercise = new Exercise(element.name, element.description);
        let response = await exercise.safeData();
        response_data.push(response);
        console.log(response);
    });

    // why dis running before await
    console.log("exercise route response_data: ");
    console.log(response_data);
    res.send(JSON.stringify(response_data));
});

module.exports = router;
