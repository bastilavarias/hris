const db = require("../index");
const subjectCategories = require("./modules/subjectCategories");
const schoolYear = require("./modules/schoolYear");

module.exports = async () => {
  await db.executeQuery(subjectCategories);
  await db.executeQuery(schoolYear);
  return "Database default data created.";
};
