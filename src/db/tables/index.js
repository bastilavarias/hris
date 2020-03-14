const db = require("../index");
const subjectCategory = require("./modules/subject/subjectCategory");
const subject = require("./modules/subject/subject");
const subjectPrerequisite = require("./modules/subject/subjectPrerequisite");

module.exports = async () => {
    await db.executeQuery(subjectCategory);
    await db.executeQuery(subject);
    await db.executeQuery(subjectPrerequisite);
    return "Database tables created.";
};