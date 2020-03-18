const designationModel = require("./model");
const helper = require("../../helper");

module.exports = {
    create: async ({name, description}) => {
        let errors = [];
        let message = "";
        const isDesignationExists = await helper.checkIfExists("designation", "name", name.toLowerCase());
        if (isDesignationExists) {
            errors.push("Designation name was already used.");
            return {
                message,
                errors
            };
        }
        await designationModel.create({name, description});
        message = "New designation is created.";
        return {
            errors,
            message
        };
    },

    update: async (designationId, {name, description}) => {
        let message = "";
        let errors = [];
        const foundDesignation = await designationModel.getSingleByName(name.toLowerCase());
        if (Object.keys(foundDesignation).length > 0 && designationId !== parseInt(foundDesignation.id)) {
            errors.push("Designation name was already used.");
            return {
                message,
                errors
            };
        }
        const isDesignationExists = await helper.checkIfExists("designation", "id", designationId);
        if (!isDesignationExists) {
            errors.push("Designation is not exists.");
            return {
                message,
                errors
            };
        }
        await designationModel.update(designationId, {name, description});
        message = "Designation is updated.";
        return {
            message,
            errors
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
        let errors = [];
        const isDesignationExists = await helper.checkIfExists("designation", "id", designationId);
        if (!isDesignationExists) {
            errors.push("Designation is not exists.");
            return {
                message,
                errors
            };
        }
        await designationModel.delete(designationId);
        message = "Designation is deleted.";
        return {
            message,
            errors
        };
    }
};