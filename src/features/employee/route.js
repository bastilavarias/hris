const express = require("express");
const employeeController = require("./controller");
const passport = require("passport");

const router = express.Router();

router.post("/create",
    passport.authenticate("jwt", {session: false}),
    employeeController.create);
router.get("/generate/employeeNumber",
    passport.authenticate("jwt", {session: false}),
    employeeController.generateEmployeeNumber);
router.get("/getSingle/:employeeId",
    passport.authenticate("jwt", {session: false}),
    employeeController.getSingle);
router.get("/get/employeeNumber",
    passport.authenticate("jwt", {session: false}),
    employeeController.generateEmployeeNumber);
router.get("/getAll",
    passport.authenticate("jwt", {session: false}),
    employeeController.getAll);
router.get("/search/:searchOption/:searchValue",
    passport.authenticate("jwt", {session: false}),
    employeeController.search);
router.put("/update/:employeeId",
    passport.authenticate("jwt", {session: false}),
    employeeController.update);

module.exports = router;