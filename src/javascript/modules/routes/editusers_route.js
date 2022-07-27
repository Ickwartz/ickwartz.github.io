const express = require("express");
const PreRegistration = require("../table_classes/preregistration");

const router = express.Router();

router
.get("/", (req, res) => {
    res.render("editusers", {
        admin: req.session.adminSession ? true : false
    });
})

.post("/preregister", (req, res) => {
    let data = req.body;
    let preregistration = new PreRegistration(data.name, data.email, "offen");
    preregistration.preregister();
    res.statusCode = 204;
    res.send();
});

module.exports = router;