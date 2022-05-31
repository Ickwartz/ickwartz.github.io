const express = require("express");
const router = express.Router()

const html_path = "./src/html"

router.get("/", (req, res) => {
    res.sendFile("index.html", {root: html_path})
})

router.get("/about", (req, res) => {
    res.sendFile("about.html", {root: html_path})
})

router.get("/training", (req, res) => {
    res.sendFile("training.html", {root: html_path})
})

router.get("/login", (req, res) => {
    res.sendFile("login.html", {root: html_path})
})

router.get("/register", (req, res) => {
    res.sendFile("register.html", {root: html_path})
})

module.exports = router