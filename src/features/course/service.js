const courseModel = require("./model");
const helper = require("../../helper");

module.exports = {
    create: async ({code, name, description, collegeId}) => {
        let error = {};
        let message = "";
        const isCourseExists = await helper.checkIfExists("course", "code", code.toLowerCase());
        if (isCourseExists) {
            error.code = "Course code was already used.";
            return {
                message,
                error
            };
        }
        await courseModel.create({code, name, description, collegeId});
        message = "New course is created.";
        return {
            error,
            message
        };
    },

    update: async (courseId, {name, description, collegeId}) => {
        let message;
        await courseModel.update(courseId, {name, description, collegeId});
        message = "Course is updated.";
        return {
            message
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
        let message;
        await courseModel.delete(courseId);
        message = "Course is deleted.";
        return {
            message
        };
    }
};