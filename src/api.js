const express = require("express");
const application = express();

const accountApi = require("./features/account/route");

application.use("/account", accountApi);

module.exports = application;
