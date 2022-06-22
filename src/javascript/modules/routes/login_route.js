const express = require("express");
const User_Account = require("../table_classes/user_accounts");

const router = express.Router();

router

.get("/", (req, res) => {
    res.render("login", {

    });
})

.post("/auth", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (email && password) {
        let user_account = new User_Account(email, password);
        user_account.verifyUser().then((verified) => {
            if (verified) {
                req.session.loggedin = true;
                req.session.user = email;   // hier maybe verknüpfung zu User --> Vorname
                res.redirect("/");
                //res.send("Hello");
                
            } else {
                res.send("Falsche Email und/oder Passwort");
            }
            res.end(); 
        });
    } else {
        res.send("Bitte Email und Passwort eingeben");
        res.end();
    }
});


module.exports = router;