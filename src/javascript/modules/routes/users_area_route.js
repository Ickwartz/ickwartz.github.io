const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("users_area", {
        admin: req.session.adminSession ? true : false
    });
});

module.exports = router;