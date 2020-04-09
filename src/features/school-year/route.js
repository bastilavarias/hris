const express = require("express");
const schoolYearController = require("./controller");
const passport = require("passport");

const router = express.Router();

router.get(
  "/getCurrent",
  passport.authenticate("jwt", { session: false }),
  schoolYearController.getCurrent
);

router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  schoolYearController.update
);

module.exports = router;
