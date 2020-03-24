const express = require("express");
const departmentController = require("./controller");
const passport = require("passport");

const router = express.Router();

router.post("/create",
    passport.authenticate("jwt", {session: false}),
    departmentController.create);
router.put("/update/:departmentId",
    passport.authenticate("jwt", {session: false}),
    departmentController.update);
router.get("/getAll",
    passport.authenticate("jwt", {session: false}),
    departmentController.getAll);
router.get("/getSingle/:departmentId",
    passport.authenticate("jwt", {session: false}),
    departmentController.getSingle);
router.get("/search/:searchOption/:searchValue",
    passport.authenticate("jwt", {session: false}),
    departmentController.search);
router.delete("/delete/:departmentId",
    passport.authenticate("jwt", {session: false}),
    departmentController.delete);

module.exports = router;