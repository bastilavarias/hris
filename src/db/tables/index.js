const db = require("../index");
const subjectCategoryTable = require("./modules/subject/subjectCategory");
const subjectTable = require("./modules/subject/subject");
const subjectPrerequisiteTable = require("./modules/subject/subjectPrerequisite");
const collegeTable = require("./modules/college");
const courseTable = require("./modules/course");
const designationTable = require("./modules/designation");

module.exports = async () => {
    await db.executeQuery(subjectCategoryTable);
    await db.executeQuery(subjectTable);
    await db.executeQuery(subjectPrerequisiteTable);
    await db.executeQuery(collegeTable);
    await db.executeQuery(courseTable);
    await db.executeQuery(designationTable);
    return "Database tables created.";
};