const express = require("express");
const subjectRoute = require("./features/subject/route");

const application = express();

application.use("/subject", subjectRoute);

module.exports = application;