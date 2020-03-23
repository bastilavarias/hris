const designationModel = require("./model");
const helper = require("../../helper");

module.exports = {
    create: async ({name, description}) => {
        let error = {};
        let message = "";
        const isDesignationExists = await helper.checkIfExists("designation", "name", name.toLowerCase());
        if (isDesignationExists) {
            error.name = "Designation name was already used.";
            return {
                message,
                error
            };
        }
        await designationModel.create({name, description});
        message = "New designation is created.";
        return {
            error,
            message
        };
    },

    update: async (designationId, {name, description}) => {
        let message = "";
        let error = {};
        const foundDesignation = await designationModel.getSingleByName(name.toLowerCase());
        if (Object.keys(foundDesignation).length > 0 && designationId !== parseInt(foundDesignation.id)) {
            error.name = "Designation name was already used.";
            return {
                message,
                error
            };
        }
        const isDesignationExists = await helper.checkIfExists("designation", "id", designationId);
        if (!isDesignationExists) {
            error.push("Designation is not exists.");
            return {
                message,
                error
            };
        }
        await designationModel.update(designationId, {name, description});
        message = "Designation is updated.";
        return {
            message,
            error
        };
    },

    getAll: async () => {
        return await designationModel.getAll();
    },

    getSingle: async (designationId) => {
        return await designationModel.getSingle(designationId);
    },

    search: async (option, value) => {
        const options = {
            name: "name"
        };
        return await designationModel.search(options[option], value.trim().toLowerCase());
    },

    delete: async (designationId) => {
        let message = "";
        let error = {};
        const isDesignationExists = await helper.checkIfExists("designation", "id", designationId);
        if (!isDesignationExists) {
            error.push("Designation is not exists.");
            return {
                message,
                error
            };
        }
        await designationModel.delete(designationId);
        message = "Designation is deleted.";
        return {
            message,
            error
        };
    }
};