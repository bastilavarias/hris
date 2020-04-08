const express = require("express");
const semesterController = require("./controller");
const passport = require("passport");

const router = express.Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  semesterController.create
);

router.put(
  "/update/:semesterId",
  passport.authenticate("jwt", { session: false }),
  semesterController.update
);

router.get(
  "/getCurrent",
  passport.authenticate("jwt", { session: false }),
  semesterController.getCurrent
);

router.get(
  "/getAll",
  passport.authenticate("jwt", { session: false }),
  semesterController.getAll
);

router.put(
  "/activate/:semesterId",
  passport.authenticate("jwt", { session: false }),
  semesterController.activate
);

router.delete(
  "/delete/:semesterId",
  passport.authenticate("jwt", { session: false }),
  semesterController.delete
);

module.exports = router;
