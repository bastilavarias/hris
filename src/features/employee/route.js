const express = require("express");
const employeeController = require("./controller");

const router = express.Router();

router.post("/create", employeeController.create);
router.get("/generate/employeeNumber", employeeController.generateEmployeeNumber);
router.get("/getSingle/:employeeId", employeeController.getSingle);
router.get("/get/employeeNumber", employeeController.generateEmployeeNumber);
router.get("/getAll", employeeController.getAll);
router.get("/search/:searchOption/:searchValue", employeeController.search);
router.put("/update/:employeeId", employeeController.update);

module.exports = router;