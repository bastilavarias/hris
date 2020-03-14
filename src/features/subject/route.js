const express = require("express");
const subjectController = require("./controller");

const router = express.Router();

router.post("/", subjectController.create);
router.put("/:subjectId", subjectController.update);
router.get("/", subjectController.getAll);
router.get("/:searchBy/:searchValue", subjectController.search);
router.delete("/:subjectId", subjectController.delete);

module.exports = router;