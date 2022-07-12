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
        --> sonst USER_ID
    - Übung verifizeren
        - Wenn nicht existiert warnen das nicht in db und keine Beschreibung angezeigt wird
        --> sonst EXERCISE_ID
    - user namen querien
    - name, date, user_id 
        --> training 
        --> query name um TRAINING_ID zu bekommen
    - exercise_id, user_id, reps, sets, comment, training_id
        - save

*/

.post("/save", async (req, res) => {
    res.send("ok");
});


module.exports = router;
