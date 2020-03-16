const express = require("express");
const subjectController = require("./controller");

const router = express.Router();

router.post("/create", subjectController.create);
router.put("/update/:subjectId", subjectController.update);
router.get("/getAll", subjectController.getAll);
router.get("/getSingle/:subjectId", subjectController.getSingle);
router.get("/getAll/categories", subjectController.getCategories);
router.get("/search/:searchOption/:searchValue", subjectController.search);
router.delete("/delete/:subjectId", subjectController.delete);

module.exports = router;