const express = require("express");
const Exercises = require("../table_classes/exercises");
const Registration = require("../table_classes/preregistration");
const Users = require("../table_classes/users");
const logger = require("@logger");

const router = express.Router();

router

.post("/getexercises", async (req, res) => {
    let exercises = new Exercises();
    try {
        let responseData = await exercises.readData();
        res.json(responseData);
    } catch (error) {
        res.statusCode = 500;
        res.send();
        logger.systemLogger.error(`${error}, caught in functionality_routes /getexercises`);
    }
})

.post("/getusers", async (req, res) => {
    let users = new Users();
    try {
        let responseData = await users.readData();
        res.json(responseData);
    } catch (error) {
        res.statusCode = 500;
        res.send();
        logger.systemLogger.error(`${error}, caught in functionality_routes /getusers`);
    }
})

.post("/getregistrationlist", async (req, res) => {
    let register_api = new Registration();
    try {
        let responseData = await register_api.getPreRegisteredList();
        res.json(responseData);
    } catch (error) {
        res.statusCode = 500;
        res.send();
        logger.systemLogger.error(`${error}, caught in functionality_routes /getexercises`);
    }
});

module.exports = router;