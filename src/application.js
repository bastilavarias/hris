const express = require("express");
const bodyParser = require("body-parser");
const application = express();
const databaseTables = require("./db/tables");
const databaseDefaultData = require("./db/defaults");

application.use(bodyParser.urlencoded({
    extended: true
}));
application.use(bodyParser.json());

databaseTables().then(m => console.log(m));
databaseDefaultData().then(m => console.log(m));

module.exports = application;