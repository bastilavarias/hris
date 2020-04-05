const express = require("express");
const scheduleController = require("./controller");

const router = express.Router();

router.post("/create/personnel-schedule/:employeeId", scheduleController.createPersonnelSchedule);
router.get("/searchByDateRanges/personnel-schedule/:employeeId", scheduleController.searchPersonnelScheduleByDateRanges);

module.exports = router;