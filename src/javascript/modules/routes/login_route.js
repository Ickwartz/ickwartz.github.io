const express = require("express");
const Users = require("../table_classes/users");
const User_Account = require("../table_classes/user_accounts");
const logger = require("@logger");

const router = express.Router();

router

.get("/", (req, res) => {
    res.render("login", {

    });
})

.post("/auth", async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    try {
        if (email && password) {
            let user_account = new User_Account(email, password);
            let verified = await user_account.verifyUser();
            if (verified) {
                let user = new Users("", "", email);
                let userInfo = await user.getUserInfoFromMail();
                req.session.loggedin = true;
                req.session.userInfo = userInfo[0];
                req.session.adminSession = await user_account.isAdmin();
                res.redirect("/");
                
            } else {
                res.send("Falsche Email und/oder Passwort");
            }
            res.end(); 
        } else {
            res.send("Bitte Email und Passwort eingeben");
            res.end();
        }
    } catch (error) {
        res.statusCode = 500;
        res.send("Ein Fehler ist aufgetreten.");
        logger.systemLogger.error(`${error}, caught in login_route /auth`);
    }
    
});


module.exports = router;