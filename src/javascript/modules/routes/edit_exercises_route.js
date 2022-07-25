const express = require("express");

const router = express.Router();

router

.get("/", async (req, res) => {
    res.render("edit_exercises", {
        admin: req.session.adminSession ? true : false
    });
});

module.exports = router;