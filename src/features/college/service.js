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
            ID: "custom_id",
            name: "name"
        };
        return await collegeModel.search(options[option], value.trim().toLowerCase());
    },

    getSingle: async (collegeId) => {
        return await collegeModel.getSingle(collegeId);
    },

    delete: async (collegeId) => {
        let message = "";
        let errors = [];
        const isCollegeIsExists = await helper.checkIfExists("college", "id", collegeId);
        if (!isCollegeIsExists) {
            errors.push("College is not exists.");
            return {
                message,
                errors
            };
        }
        await collegeModel.delete(collegeId);
        message = "College is deleted.";
        return {
            message,
            errors
        };
    }
};