const express = require("express");
const User  = require("../table_classes/users");
const User_Accounts = require("../table_classes/user_accounts");

const router = express.Router();

router

.get("/", (req, res) => {
    res.render("register", {

    });
})

.post("/registrate", (req, res) => {
    let first_name = req.body.first_name;
    let surname = req.body.surname;
    let email = req.body.email;
    let password = req.body.password;
    let password_confirm = req.body.password_confirm;

    if (first_name && surname && email && password && password_confirm) {
        if (password === password_confirm) {
            let user = new User(first_name, surname, email);
            let user_account = new User_Accounts(email, password);
        } else {
            res.send("Passwort wiederholung stimmt nicht überein");
            //setTimeout(function(){}, 5000);
            //res.redirect("/register");
        }
    } else {
        res.send("Bitte alle Felder ausfüllen");
        setTimeout("", 5000);
        res.redirect("/register");
    }
});


module.exports = router;