require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const application = express();
const cors = require("cors");
const api = require("./api");
const passport = require("passport");
const jsonWebTokenService = require("./features/jsonWebToken/service");

application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: true }));
application.use(cors());

application.use("/api", api);
application.use(passport.initialize());
jsonWebTokenService.init(passport);

if (process.env.NODE_ENV === "production") {
  application.use(express.static(__dirname + "/public/"));
  application.get(/.*/, (req, res) =>
    res.sendFile(__dirname + "/public/index.html")
  );
}

module.exports = application;
