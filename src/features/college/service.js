const collegeModel = require("./model");
const helper = require("../../helper");

module.exports = {
    create: async ({customId, name, description}) => {
        let error = {};
        let message = "";
        const isCollegeIsExists = await helper.checkIfExists("college", "custom_id", customId.toLowerCase());
        if (isCollegeIsExists) {
            error.customId = "College ID was already used.";
            return {
                message,
                error
            };
        }
        await collegeModel.create({customId, name, description});
        message = "New college is created.";
        return {
            error,
            message
        };
    },

    update: async (collegeId, {name, description}) => {
        let message;
        await collegeModel.update(collegeId, {name, description});
        message = "College is updated.";
        return {
            message
        };
    },

    getAll: async () => {
        return await collegeModel.getAll();
    },

    search: async (option, value) => {
        const options = {
            "custom ID": "custom_id",
            name: "name"
        };
        return await collegeModel.search(options[option], value.trim().toLowerCase());
    },

    getSingle: async (collegeId) => {
        return await collegeModel.getSingle(collegeId);
    },

    delete: async (collegeId) => {
        let message;
        await collegeModel.delete(collegeId);
        message = "College is deleted.";
        return {
            message
        };
    }
};