const express = require("express");

const router = express.Router();

router

.get("/", (req, res) => {
    res.render("new_schedule", {
        admin: req.session.adminSession ? true : false
    });
})

.post("/save", async (req, res) => {
    res.send("ok");
});


module.exports = router;
