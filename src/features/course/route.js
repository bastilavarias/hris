const express = require("express");
const courseController = require("./controller");

const router = express.Router();

router.post("/create", courseController.create);
router.get("/getAll", courseController.getAll);
router.get("/getSingle/:courseId", courseController.getSingle);
router.get("/search/:searchOption/:searchValue", courseController.search);
router.delete("/delete/:courseId", courseController.delete);

module.exports = router;