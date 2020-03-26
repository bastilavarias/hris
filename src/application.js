const express = require("express");
const bodyParser = require("body-parser");
const application = express();
const databaseTables = require("./db/tables");
const databaseDefaultData = require("./db/defaults");
const expressFileUpload = require("express-fileupload");
const passport = require("passport");
const jwtPassport = require("./passport/jwt");

application.use(bodyParser.urlencoded({
    extended: true
}));
application.use(bodyParser.json());
application.use(
    expressFileUpload({
        useTempFiles: true
    })
);
application.use(passport.initialize());
jwtPassport(passport);

databaseTables().then(m => console.log(m));
databaseDefaultData().then(m => console.log(m));

const cors = require("cors");
const api = require("./api");

application.use(cors());
application.use("/api/development", api);

if (process.env.NODE_ENV === "production") {
    application.use(express.static(__dirname + "/public/"));
    application.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

module.exports = application;