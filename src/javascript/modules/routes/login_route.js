const express = require("express");
const Users = require("../table_classes/users");
const User_Account = require("../table_classes/user_accounts");
const logger = require("@logger");

const router = express.Router();

let lastReferer;

function checkReferer(ref) {
    if (!ref) return "/";
    let parts = ref.split("/");
    if (parts[0] === "http:" && parts[1] === "" && parts[2] === "localhost:8080") return ref;    // exactly http://localhost:8080
    return "/";
}

router

.get("/", (req, res) => {
    lastReferer = checkReferer(req.header("referer"));
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
                logger.eventLogger.info(`${email} logged in.`);
                req.session.userInfo = userInfo[0];
                req.session.adminSession = await user_account.isAdmin();
                res.redirect(lastReferer);
                
            } else {
                res.send("Falsche Email und/oder Passwort");
                logger.eventLogger.info(`${email} tried to log in unsuccessfully.`);
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