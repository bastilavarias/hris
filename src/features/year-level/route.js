const express = require("express");
const yearLevelController = require("./controller");
const passport = require("passport");

const router = express.Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  yearLevelController.create
);
router.put(
  "/update/:yearLevelId",
  passport.authenticate("jwt", { session: false }),
  yearLevelController.update
);
router.get(
  "/getAll",
  passport.authenticate("jwt", { session: false }),
  yearLevelController.getAll
);
router.get(
  "/getSingle/:yearLevelId",
  passport.authenticate("jwt", { session: false }),
  yearLevelController.getSingle
);
router.delete(
  "/delete/:yearLevelId",
  passport.authenticate("jwt", { session: false }),
  yearLevelController.delete
);
router.get(
  "/search/:searchOption/:searchValue",
  passport.authenticate("jwt", { session: false }),
  yearLevelController.search
);

module.exports = router;
