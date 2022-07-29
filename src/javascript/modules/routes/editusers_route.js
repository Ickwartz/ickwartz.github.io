const express = require("express");
const PreRegistration = require("../table_classes/preregistration");
const Users = require("../table_classes/users");

const router = express.Router();

router
.get("/", (req, res) => {
    res.render("editusers", {
        admin: req.session.adminSession ? true : false
    });
})

.post("/preregister", (req, res) => {
    let data = req.body;
    if (!data.email) {
        res.statusCode = 406;
        res.send();
    }
    let preregistration = new PreRegistration(data.name, data.email, "offen");
    preregistration.preregister();
    res.statusCode = 204;
    res.send();
})

.post("/deletePreregister", (req, res) => {
    let data = req.body;
    if (!data.email) {
        res.statusCode = 406;
        res.send;
    }
    let preregistration = new PreRegistration();
    preregistration.deletePreRegistration(data.email);
    res.statusCode = 204,
    res.send();
})

.post("/markForDeletion", (req, res) => {
    let data = req.body;
    if (!data.user_id) {
        res.statusCode = 406;
        res.send();
    }
    let users = new Users();
    users.setupForDeletion(data.user_id, data.date);
    res.statusCode = 204;
    res.send();
});

module.exports = router;