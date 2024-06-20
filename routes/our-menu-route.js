const express = require("express");
const router = express.Router();
const {checkUserAuth} = require("../controllers/userAuthenticator");

router.get("/", checkUserAuth, (req, res) => {
    res.send({msg: "hi menu"});
});

module.exports = router;