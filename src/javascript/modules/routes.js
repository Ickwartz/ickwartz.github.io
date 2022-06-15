const express = require("express");
const router = express.Router()

router.get("/", (req, res) => {
    res.render("index", {
        //vars
    })
})

router.get("/about", (req, res) => {
    res.render("about", {
        //vars
    })
})

router.get("/training", (req, res) => {
    res.render("training", {
        //vars
    })
})

router.get("/login", (req, res) => {
    res.render("login", {
        //vars
    })
})

router.get("/register", (req, res) => {
    res.render("register", {
        //vars
    })
})

// JUST TEST, REMOVE LATER 
router.get("/test", (req, res) => {
    res.render("test", {
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
    })
})


module.exports = router