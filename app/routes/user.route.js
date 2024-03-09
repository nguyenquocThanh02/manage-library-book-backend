const express = require("express");
const users = require("../controllers/user.controller");

const router = express.Router();


router.route("/")
    .get(users.findAll)
    .post(users.create);

router.route("/login")
    .post(users.login);
    
router.route("/:email")
    .get(users.findOne)
    .put(users.update);

module.exports = router;