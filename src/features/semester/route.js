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
  "/getSingle/:semesterId",
  passport.authenticate("jwt", { session: false }),
  semesterController.getSingle
);

router.get(
  "/search/:searchOption/:searchValue",
  passport.authenticate("jwt", { session: false }),
  semesterController.search
);

router.get(
  "/getAll",
  passport.authenticate("jwt", { session: false }),
  semesterController.getAll
);

router.delete(
  "/delete/:semesterId",
  passport.authenticate("jwt", { session: false }),
  semesterController.delete
);

module.exports = router;
