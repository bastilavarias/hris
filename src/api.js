const express = require("express");
const subjectRoute = require("./features/subject/route");
const collegeRoute = require("./features/college/route");
const courseRoute = require("./features/course/route");
const designationRoute = require("./features/designation/route");

const application = express();

application.use("/subject", subjectRoute);
application.use("/college", collegeRoute);
application.use("/college", collegeRoute);
application.use("/course", courseRoute);
application.use("/designation", designationRoute);

module.exports = application;