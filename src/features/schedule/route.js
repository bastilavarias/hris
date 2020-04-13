const express = require("express");
const scheduleController = require("./controller");
const passport = require("passport");

const router = express.Router();

router.post(
  "/create/personnel-schedule/:employeeId",
  passport.authenticate("jwt", { session: false }),
  scheduleController.createPersonnelSchedule
);
router.post(
  "/create/faculty-schedule",
  passport.authenticate("jwt", { session: false }),
  scheduleController.createFacultySchedule
);
router.post(
  "/search/personnel-schedule/:employeeId",
  passport.authenticate("jwt", { session: false }),
  scheduleController.searchPersonnelSchedule
);
router.put(
  "/update/personnel-schedule/:employeeId",
  passport.authenticate("jwt", { session: false }),
  scheduleController.updatePersonnelSchedule
);
router.put(
  "/delete/personnel-schedule/:employeeId",
  passport.authenticate("jwt", { session: false }),
  scheduleController.deletePersonnelSchedule
);
router.get(
  "/get/personal-personnel-schedule/:date",
  passport.authenticate("jwt", { session: false }),
  scheduleController.getPersonalPersonnelSchedule
);

module.exports = router;
