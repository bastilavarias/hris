const express = require("express");
const scheduleController = require("./controller");

const router = express.Router();

router.post("/create/personnel-schedule/:employeeId", scheduleController.createPersonnelSchedule);
router.post("/search/personnel-schedule/:employeeId", scheduleController.searchPersonnelSchedule);
router.put("/update/personnel-schedule/:employeeId", scheduleController.updatePersonnelSchedule);
router.put("/delete/personnel-schedule/:employeeId", scheduleController.deletePersonnelSchedule);
router.get("/get/personnel-schedule/:employeeId/:date", scheduleController.getPersonnelSchedule);

module.exports = router;