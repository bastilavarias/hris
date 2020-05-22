const express = require("express");
const router = express.Router();
const accountController = require("./controller");
const passport = require("passport");
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  accountController.authentication
);
router.post("/login", accountController.login);

module.exports = router;
