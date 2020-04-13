const db = require("../index");
const subjectCategories = require("./modules/subjectCategories");
const schoolYear = require("./modules/schoolYear");
const days = require("./modules/days");

module.exports = async () => {
  await db.executeQuery(subjectCategories);
  await db.executeQuery(schoolYear);
  await db.executeQuery(days);
  return "Database default data created.";
};
