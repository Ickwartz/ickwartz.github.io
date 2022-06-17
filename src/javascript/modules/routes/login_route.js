const express = require("express");
const account = require("../table_classes/user_accounts");

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
        let user = new account(email, password);
        user.verifyUser().then((verified) => {
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