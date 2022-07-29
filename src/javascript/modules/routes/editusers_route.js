const express = require("express");
const logger = require("@logger");
const PreRegistration = require("../table_classes/preregistration");
const Users = require("../table_classes/users");

const router = express.Router();

router
.get("/", (req, res) => {
    res.render("editusers", {
        admin: req.session.adminSession ? true : false
    });
})

.post("/preregister", async (req, res) => {
    let data = req.body;
    if (!data.email) {
        res.statusCode = 406;
        res.send();
    }
    let preregistration = new PreRegistration(data.name, data.email, "offen");
    preregistration.preregister().then(() => {
        res.statusCode = 204;
        res.send();
    }).catch(error => {
        logger.systemLogger.error(`${error} caught in editusers_route /preregister`);
        res.status = 500;
        res.send();
    });
})

.post("/deletePreregister", async (req, res) => {
    let data = req.body;
    if (!data.email) {
        res.statusCode = 406;
        res.send();
    }
    let preregistration = new PreRegistration();
    preregistration.deletePreRegistration(data.email).then(()=> {
        res.statusCode = 204,
        res.send();
    }).catch(error => {
        logger.systemLogger.error(`${error} caught in editusers_route /deletePreregister`);
        res.status = 500;
        res.send();
    });
})

.post("/markForDeletion", async (req, res) => {
    let data = req.body;
    if (!data.user_id) {
        res.statusCode = 406;
        res.send();
    }
    let users = new Users();
    users.setupForDeletion(data.user_id, data.date).then(() => {
        res.statusCode = 204;
        res.send();
    }).catch(error => {
        logger.systemLogger.error(`${error} caught in editusers_route /markfForDeletion`);
        res.status = 500;
        res.send();
    });
});

module.exports = router;