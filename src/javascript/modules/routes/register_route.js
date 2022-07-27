const express = require("express");
const hashing = require("../helpers/hashing");
const User  = require("../table_classes/users");
const User_Accounts = require("../table_classes/user_accounts");
const Preregister = require("../table_classes/preregistration");

const router = express.Router();

router

.get("/", (req, res) => {
    res.render("register", {
        registerMessage: req.session.registerMessage
    });
})

.post("/registrate", async (req, res) => {
    let first_name = req.body.first_name;
    let surname = req.body.surname;
    let email = req.body.email;
    let password = req.body.password;
    let password_confirm = req.body.password_confirm;

    if (!first_name || !surname || !email || !password || !password_confirm) {
        req.session.registerMessage = "Bitte alle Felder ausfüllen";
        res.redirect("/register");
        return;
    }
    
    if (password !== password_confirm) {
        req.session.registerMessage = "Passwort wiederholung stimmt nicht überein";
        res.redirect("/register");
        return;
    }
    
    let preregister = new Preregister(surname, email);
    if (! await preregister.isPreRegistered()) {
        req.session.registerMessage = "Bitte melden Sie sich bei mir an, bevor Sie sich auf dieser Seite registrieren.";
        res.redirect("/register");
        return;
    }

    password = await hashing.hashPw(password);
    let user = new User(first_name, surname, email);
    let user_account = new User_Accounts(email, password);
    let user_id = user.safeData();
    user_account.safeData();
    req.session.loggedin = true;
    req.session.userInfo = {
        user_id: user_id,
        first_name: first_name,
        surname: surname,
        email: email,
        member_since: user.member_since
        };
    res.redirect("/");
});


module.exports = router;