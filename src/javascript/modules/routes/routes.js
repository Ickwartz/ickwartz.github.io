const express = require("express");
const router = express.Router();

const functionalityRoutes = require("./functionality_routes");
const login = require("./login_route");
const logout = require("./logout_route");
const register = require("./register_route");
const exercises = require("./new_exercises_route");
const editExercises = require("./edit_exercises_route");
const training = require("./training_route");
const new_schedule = require("./new_schedule_route");
const users_area = require("./users_area_route");

router

    .get("/", (req, res) => {
        res.render("index", {});
    })

    .use("/", functionalityRoutes)

    .get("/about", (req, res) => {
        res.render("about", {});
    })

    .use("/newexercise", exercises)

    .use("/editexercises", editExercises)

    .use("/newschedule", new_schedule)

    .use("/training", training)

    .use("/login", login)

    .use("/logout", logout)

    .use("/register", register)

    .use("/usersarea", users_area);


module.exports = router;