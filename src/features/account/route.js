const express = require("express");
const accountController = require("./controller");

const router = express.Router();

router.post("/login", accountController.login);

module.exports = router;