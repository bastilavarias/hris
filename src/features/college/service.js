const collegeModel = require("./model");
const helper = require("../../helper");

module.exports = {
    create: async ({customId, name, description}) => {
        let errors = [];
        let message = "";
        const isCollegeIsExists = await helper.checkIfExists("college", "custom_id", customId.toLowerCase());
        if (isCollegeIsExists) {
            errors.push("College id was already used.");
            return {
                message,
                errors
            };
        }
        await collegeModel.create({customId, name, description});
        message = "New college is created.";
        return {
            errors,
            message
        };
    },

    update: async (collegeId, {customId, name, description}) => {
        let message = "";
        let errors = [];
        const isCollegeIsExists = await helper.checkIfExists("college", "custom_id", customId.toLowerCase());
        if (!isCollegeIsExists) {
            errors.push(`College with id of ${customId} is not existing in database.`);
            return {
                errors,
                message
            };
        }
        await collegeModel.update(collegeId, {name, description});
        message = "College is updated.";
        return {
            message,
            errors
        };
    },

    getAll: async () => {
        return await collegeModel.getAll();
    },

    search: async (option, value) => {
        const options = {
            customId: "custom_id",
            name: "name"
        };
        return await collegeModel.search(options[option], value.trim().toLowerCase());
    },

    getSingle: async (collegeId) => {
        return await collegeModel.getSingle(collegeId);
    },

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