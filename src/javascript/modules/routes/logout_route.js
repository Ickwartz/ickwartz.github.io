const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    req.session.loggedin = false;
    req.session.user = "";
    req.session.adminSession = false;
    res.redirect("/");
});

module.exports = router;