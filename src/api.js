const express = require("express");
const subjectRoute = require("./features/subject/route");
const collegeRoute = require("./features/college/route");
const courseRoute = require("./features/course/route");
const sectionRoute = require("./features/section/route");
const designationRoute = require("./features/designation/route");
const employeeRoute = require("./features/employee/route");
const departmentRoute = require("./features/department/route");
const accountRoute = require("./features/account/route");
const pdsRoute = require("./features/personal-data-sheet/route");
const scheduleRoute = require("./features/schedule/route");
const semesterRoute = require("./features/semester/route");
const schoolYearRoute = require("./features/school-year/route");
const yearLevel = require("./features/year-level/route");
const building = require("./features/building/route");
const room = require("./features/room/route");

const application = express();

application.use("/subject", subjectRoute);
application.use("/college", collegeRoute);
application.use("/college", collegeRoute);
application.use("/course", courseRoute);
application.use("/section", sectionRoute);
application.use("/designation", designationRoute);
application.use("/employee", employeeRoute);
application.use("/department", departmentRoute);
application.use("/account", accountRoute);
application.use("/personal-data-sheet", pdsRoute);
application.use("/schedule", scheduleRoute);
application.use("/semester", semesterRoute);
application.use("/school-year", schoolYearRoute);
application.use("/year-level", yearLevel);
application.use("/building", building);
application.use("/room", room);

module.exports = application;
