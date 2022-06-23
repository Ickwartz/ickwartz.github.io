const express = require("express");
const User_Account = require("../table_classes/user_accounts");

const router = express.Router();

router

.get("/", (req, res) => {
    res.render("login", {

    });
})

.post("/auth", async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (email && password) {
        let user_account = new User_Account(email, password);
        let verified = await user_account.verifyUser();
        if (verified) {
            req.session.loggedin = true;
            req.session.user = email;   // hier maybe verknüpfung zu User --> Vorname
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
});


module.exports = router;