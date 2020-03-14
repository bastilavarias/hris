const db = require("../index");
const subjectCategories = require("./modules/subjectCategories");

module.exports = async () => {
    await db.executeQuery(subjectCategories);
    return "Database default data created.";
};