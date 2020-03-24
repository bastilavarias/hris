const express = require("express");
const designationController = require("./controller");
const passport = require("passport");

const router = express.Router();

router.post("/create",
    passport.authenticate("jwt", {session: false}), designationController.create);
router.put("/update/:designationId",
    passport.authenticate("jwt", {session: false}), designationController.update);
router.get("/getAll",
    passport.authenticate("jwt", {session: false}), designationController.getAll);
router.get("/getSingle/:designationId",
    passport.authenticate("jwt", {session: false}), designationController.getSingle);
router.get("/search/:searchOption/:searchValue",
    passport.authenticate("jwt", {session: false}), designationController.search);
router.delete("/delete/:designationId",
    passport.authenticate("jwt", {session: false}), designationController.delete);

module.exports = router;