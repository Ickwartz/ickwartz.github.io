const Exercise = require("../table_classes/exercises");
const express = require("express");

const router = express.Router();

router

.get("/", (req, res) => {
    res.render("new_exercise", {
        
    });
})

.post("/save", async (req, res) => {
    let data = req.body;
    let response_data = [];
    for (const element of data) {
        let exercise = new Exercise(element.name, element.description);
        let response = await exercise.saveData();
        response_data.push(response);
    }
    res.set("Content-Type", "application/json");
    res.json(response_data);
});


module.exports = router;
