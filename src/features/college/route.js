const express = require("express");
const collegeController = require("./controller");

const router = express.Router();

router.post("/create", collegeController.create);
router.put("/update/:collegeId", collegeController.update);
router.get("/getAll", collegeController.getAll);
router.get("/search/:searchOption/:searchValue", collegeController.search);
router.get("/getSingle/:collegeId", collegeController.getSingle);

module.exports = router;