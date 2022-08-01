const Exercise = require("../table_classes/exercises");
const express = require("express");
const logger = require("@logger");

const router = express.Router();

router

.get("/", (req, res) => {
    res.render("exercises", {
        admin: req.session.adminSession ? true : false
    });
})

.post("/save", async (req, res) => {
    try {
        let data = req.body;
        let response_data = [];
        for (const element of data) {
            let exercise = new Exercise(element.name, element.description);
            let response = await exercise.saveData();
            response_data.push(response);
        }
        res.set("Content-Type", "application/json");
        res.json(response_data);
    } catch (error) {
        res.statusCode = 500;
        res.send();
        logger.systemLogger.error(`${error}, caught in new_exercises_route /save`);
    }
    
});


module.exports = router;
