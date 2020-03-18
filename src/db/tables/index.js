const db = require("../index");
const subjectCategory = require("./modules/subject/subjectCategory");
const subject = require("./modules/subject/subject");
const subjectPrerequisite = require("./modules/subject/subjectPrerequisite");
const college = require("./modules/college");
const course = require("./modules/course");
const designation = require("./modules/designation");
const profile = require("./modules/profile");
const department = require("./modules/department");
const employee = require("./modules/employee");

module.exports = async () => {
    let message = "";
    try {
        await db.executeQuery(subjectCategory);
        await db.executeQuery(subject);
        await db.executeQuery(subjectPrerequisite);
        await db.executeQuery(college);
        await db.executeQuery(course);
        await db.executeQuery(department);
        await db.executeQuery(designation);
        await db.executeQuery(profile);
        await db.executeQuery(employee);
        message ="Database tables created.";
    } catch (errors) {
        console.log(errors);
    }
    return message;
};