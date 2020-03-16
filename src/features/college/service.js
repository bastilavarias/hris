const collegeModel = require("./model");
const helper = require("../../helper");

module.exports = {
    create: async ({name, description}) => {
        let errors = [];
        let message = "";
        const isExists = await helper.checkIfExists("college", "name", name);
        if (isExists) {
            errors.push("Subject was already code used.");
            return {
                message,
                errors
            };
        }
        const createdSubjectId = await collegeModel.create({code, title, description, units, categoryId});
        message = "New subject is created.";
        return {
            errors,
            message
        };
    },

    // update: async (subjectId, {title, code, description, units, categoryId, prerequisiteSubjectId}) => {
    //     let message = "";
    //     let errors = [];
    //     const isSubjectExists = await subjectModel.checkIfExists("code", code);
    //     if (!isSubjectExists) {
    //         errors.push(`Subject with code of ${code} is not existing in database.`);
    //         return {
    //             errors,
    //             message
    //         };
    //     }
    //     await subjectModel.update(subjectId, {title, description, units, categoryId});
    //     await subjectModel.deleteAllPrerqeuisites(subjectId);
    //     if (prerequisiteSubjectId) {
    //         await subjectModel.addPrerequisite(subjectId, prerequisiteSubjectId);
    //     }
    //     message = "Subject is updated.";
    //     return {
    //         message,
    //         errors
    //     };
    // },

    // getAll: async () => {
    //     return await subjectModel.getAll();
    // },

    // getSingle: async (subjectId) => {
    //     return await subjectModel.getSingle(subjectId);
    // },

    // search: async (option, value) => {
    //     const options = {
    //         code: "code",
    //         title: "title"
    //     };
    //     return await subjectModel.search(options[option], value);
    // },

    // delete: async (subjectId) => {
    //     let message = "";
    //     let errors = [];
    //     const isExists = await subjectModel.checkIfExists("id", subjectId);
    //     if (!isExists) {
    //         errors.push("Subject is not exists.");
    //         return {
    //             message,
    //             errors
    //         };
    //     }
    //     await subjectModel.delete(subjectId);
    //     message = "Subject is deleted.";
    //     return {
    //         message,
    //         errors
    //     };
    // }
};