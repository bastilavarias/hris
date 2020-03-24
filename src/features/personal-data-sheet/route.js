const express = require("express");
const personalDataSheetController = require("./controller");
const passport = require("passport");

const router = express.Router();

router.get("/getSingle/:employeeId",
    passport.authenticate("jwt", {session: false}),
    personalDataSheetController.getSingle);

module.exports = router;