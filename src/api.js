const express = require("express");
const subjectRoute = require("./features/subject/route");
const collegeRoute = require("./features/college/route");
const courseRoute = require("./features/course/route");
const designationRoute = require("./features/designation/route");
const employeeRoute = require("./features/employee/route");
const departmentRoute = require("./features/department/route");
const accountRoute = require("./features/account/route");
const pdsRoute = require("./features/personal-data-sheet/route");

const application = express();

application.use("/subject", subjectRoute);
application.use("/college", collegeRoute);
application.use("/college", collegeRoute);
application.use("/course", courseRoute);
application.use("/designation", designationRoute);
application.use("/employee", employeeRoute);
application.use("/department", departmentRoute);
application.use("/account", accountRoute);
application.use("/personal-data-sheet", pdsRoute);

module.exports = application;