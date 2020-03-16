const db = require("../index");
const subjectCategory = require("./modules/subject/subjectCategory");
const subject = require("./modules/subject/subject");
const subjectPrerequisite = require("./modules/subject/subjectPrerequisite");
const college = require("./modules/college");

module.exports = async () => {
    await db.executeQuery(subjectCategory);
    await db.executeQuery(subject);
    await db.executeQuery(subjectPrerequisite);
    await db.executeQuery(college);
    return "Database tables created.";
};