const express = require("express");
const roomController = require("./controller");
const passport = require("passport");

const router = express.Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  roomController.create
);

router.put(
  "/update/:roomId",
  passport.authenticate("jwt", { session: false }),
  roomController.update
);

router.get(
  "/getSingle/:roomId",
  passport.authenticate("jwt", { session: false }),
  roomController.getSingle
);

router.get(
  "/search/:searchOption/:searchValue",
  passport.authenticate("jwt", { session: false }),
  roomController.search
);

router.get(
  "/getAll",
  passport.authenticate("jwt", { session: false }),
  roomController.getAll
);

router.delete(
  "/delete/:roomId",
  passport.authenticate("jwt", { session: false }),
  roomController.delete
);

module.exports = router;
