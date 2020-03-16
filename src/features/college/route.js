const express = require("express");
const collegeController = require("./controller");

const router = express.Router();

router.post("/create", collegeController.create);


module.exports = router;