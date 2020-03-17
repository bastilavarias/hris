const express = require("express");
const designationController = require("./controller");

const router = express.Router();

router.post("/create", designationController.create);
router.put("/update/:designationId", designationController.update);
router.get("/getAll", designationController.getAll);
router.get("/getSingle/:designationId", designationController.getSingle);
router.get("/search/:searchOption/:searchValue", designationController.search);
router.delete("/delete/:designationId", designationController.delete);

module.exports = router;