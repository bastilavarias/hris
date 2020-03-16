const courseModel = require("./model");
const helper = require("../../helper");

module.exports = {
    create: async ({code, name, description, collegeId}) => {
        let errors = [];
        let message = "";
        const isCourseExists = await helper.checkIfExists("course", "code", code.toLowerCase());
        if (isCourseExists) {
            errors.push("Course code was already used.");
            return {
                message,
                errors
            };
        }
        await courseModel.create({code, name, description, collegeId});
        message = "New course is created.";
        return {
            errors,
            message
        };
    },

    update: async (courseId, {code, name, description, collegeId}) => {
        let message = "";
        let errors = [];
        const isCourseExists = await helper.checkIfExists("course", "code", code);
        if (!isCourseExists) {
            errors.push(`Course with code of ${code} is not existing in database.`);
            return {
                errors,
                message
            };
        }
        await courseModel.update(courseId, {code, name, description, collegeId});
        message = "Course is updated.";
        return {
            message,
            errors
        };
    },

    getAll: async () => {
        return await courseModel.getAll();
    },

    getSingle: async (courseId) => {
        return await courseModel.getSingle(courseId);
    },

    search: async (option, value) => {
        const options = {
            code: "code",
            name: "name"
        };
        return await courseModel.search(options[option], value.trim().toLowerCase());
    },

    delete: async (courseId) => {
        let message = "";
        let errors = [];
        const isCourseExists = await helper.checkIfExists("course", "id", courseId);
        if (!isCourseExists) {
            errors.push("Course is not exists.");
            return {
                message,
                errors
            };
        }
        await courseModel.delete(courseId);
        message = "Course is deleted.";
        return {
            message,
            errors
        };
    }
};