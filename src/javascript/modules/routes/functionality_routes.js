const express = require("express");
const Exercises = require("../table_classes/exercises");
const Registration = require("../table_classes/preregistration");
const Users = require("../table_classes/users");

const router = express.Router();

router

.post("/getexercises", async (req, res) => {
    let exercises = new Exercises();
    let responseData = await exercises.readData();
    res.json(responseData);
})

.post("/getusers", async (req, res) => {
    let users = new Users();
    let responseData = await users.readData();
    res.json(responseData);
})

.post("/getregistrationlist", async (req, res) => {
    let register_api = new Registration();
    let responseData = await register_api.getPreRegisteredList();
    res.json(responseData);
});

module.exports = router;