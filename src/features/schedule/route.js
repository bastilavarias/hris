const express = require("express");
const scheduleController = require("./controller");

const router = express.Router();

router.post("/create/personnel-schedule/:employeeId", scheduleController.createPersonnelSchedule);

module.exports = router;