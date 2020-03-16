const db = require("../index");
const subjectCategory = require("./modules/subject/subjectCategory");
const subject = require("./modules/subject/subject");
const subjectPrerequisite = require("./modules/subject/subjectPrerequisite");
const college = require("./modules/college");
const course = require("./modules/course");

module.exports = async () => {
    await db.executeQuery(subjectCategory);
    await db.executeQuery(subject);
    await db.executeQuery(subjectPrerequisite);
    await db.executeQuery(college);
    await db.executeQuery(course);
    return "Database tables created.";
};