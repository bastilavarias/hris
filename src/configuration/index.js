let configurations;

if (process.env.NODE_ENV === "production") {
    configurations = require("./modules/production");
} else {
    configurations = require("./modules/development");
}

module.exports = configurations;