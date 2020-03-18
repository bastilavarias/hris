const db = require("../index");
const subjectCategory = require("./modules/subject/subjectCategory");
const subject = require("./modules/subject/subject");
const subjectPrerequisite = require("./modules/subject/subjectPrerequisite");
const college = require("./modules/college");
const course = require("./modules/course");
const designation = require("./modules/designation");
const profile = require("./modules/profile");
const employee = require("./modules/employee");
const department = require("./modules/department");

module.exports = async () => {
    await db.executeQuery(subjectCategory);
    await db.executeQuery(subject);
    await db.executeQuery(subjectPrerequisite);
    await db.executeQuery(college);
    await db.executeQuery(course);
    await db.executeQuery(designation);
    await db.executeQuery(profile);
    await db.executeQuery(employee);
    await db.executeQuery(department);
    return "Database tables created.";
};