const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    req.session.loggedin = false;
    req.session.userInfo = {
        user_id: 0,
        first_name: "",
        surname: "",
        email: "",
        member_since: ""
      };
    req.session.adminSession = false;
    res.redirect("/");
});

module.exports = router;