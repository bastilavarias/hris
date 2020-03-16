const express = require("express");
const subjectRoute = require("./features/subject/route");
const collegeRoute = require("./features/college/route");
const courseRoute = require("./features/course/route");

const application = express();

application.use("/subject", subjectRoute);
application.use("/college", collegeRoute);
application.use("/course", courseRoute);

module.exports = application;