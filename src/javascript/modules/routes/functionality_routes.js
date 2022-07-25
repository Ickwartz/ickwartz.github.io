const express = require("express");
const Exercises = require("../table_classes/exercises");

const router = express.Router();

router

.post("/getexercises", async (req, res) => {
    let exercises = new Exercises();
    let responseData = await exercises.readData();
    res.json(responseData);
});

module.exports = router;