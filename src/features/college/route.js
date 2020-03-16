const express = require("express");
const collegeController = require("./controller");

const router = express.Router();

router.post("/create", collegeController.create);
router.put("/update/:collegeId", collegeController.update);

module.exports = router;