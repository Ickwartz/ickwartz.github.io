const express = require("express");
const router =  express.Router();

router.get("/test", (req, res) => {
    res.send("OK");
});

module.exports = router;

/*
.render("test", {
        items: [
            {
                uebung: "Test Übung",
                reps: "100",
                sets: "10",
                comment: "Keine",
                description: "Eine Übung mit 2 Bergen und dem tiefen weiten Meer"
            },
            {
                uebung: "Test Übung 2",
                reps: "200",
                sets: "1",
                comment: "Mach ma erstma 200 davon",
                description: "Nepumuk ist der beste Drache"
            }
        ]
    });
*/