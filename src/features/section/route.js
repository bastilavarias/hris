const express = require("express");
const sectionController = require("./controller");

const router = express.Router();

router.post("/create", sectionController.create);
router.put("/update/:sectionId", sectionController.update);
router.get("/getAll", sectionController.getAll);
router.get("/getSingle/:sectionId", sectionController.getSingle);
router.get("/search/:searchOption/:searchValue", sectionController.search);
router.delete("/delete/:sectionId", sectionController.delete);

module.exports = router;