const express = require("express");

const router = express.Router();

router

.get("/", (req, res) => {
    res.render("new_schedule", {
        admin: req.session.adminSession ? true : false
    });
})
/* TODO SAVE
    - User verifizierung
        - response wenn nicht vorhanden
    - Übung verifizeren
        - Wenn nicht existiert warnen das nicht in db und keine Beschreibung angezeigt wird
    - 

*/

.post("/save", async (req, res) => {
    res.send("ok");
});


module.exports = router;
