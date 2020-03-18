const express = require("express");
const departmentController = require("./controller");

const router = express.Router();

router.post("/create", departmentController.create);
router.put("/update/:departmentId", departmentController.update);
router.get("/getAll", departmentController.getAll);
router.get("/getSingle/:departmentId", departmentController.getSingle);
router.get("/search/:searchOption/:searchValue", departmentController.search);
router.delete("/delete/:departmentId", departmentController.delete);

module.exports = router;