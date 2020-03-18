const express = require("express");
const employeeController = require("./controller");
const multer = require("../../multer.js");

const router = express.Router();

router.post("/create", multer.single("profilePhoto"), employeeController.create);

module.exports = router;