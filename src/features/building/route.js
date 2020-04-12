const express = require("express");
const buildingController = require("./controller");
const passport = require("passport");

const router = express.Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  buildingController.create
);

router.put(
  "/update/:buildingId",
  passport.authenticate("jwt", { session: false }),
  buildingController.update
);

router.get(
  "/getSingle/:buildingId",
  passport.authenticate("jwt", { session: false }),
  buildingController.getSingle
);

router.get(
  "/search/:searchOption/:searchValue",
  passport.authenticate("jwt", { session: false }),
  buildingController.search
);

router.get(
  "/getAll",
  passport.authenticate("jwt", { session: false }),
  buildingController.getAll
);

router.delete(
  "/delete/:buildingId",
  passport.authenticate("jwt", { session: false }),
  buildingController.delete
);

module.exports = router;
