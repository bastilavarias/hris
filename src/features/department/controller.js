const departmentService = require("./service");
const customUtilities = require("../../customUtilities");

module.exports = {
    create: async (req, res) => {
        const departmentData = req.body;
        try {
            const result = await departmentService.create(departmentData);
            res.status(200).json(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json(errors);
        }
    },

    update: async (req, res) => {
        const departmentId = customUtilities.toNumber(req.params.departmentId);
        const departmentData = req.body;
        try {
            const result = await departmentService.update(departmentId, departmentData);
            res.status(200).json(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json(errors);
        }
    },

    getAll: async (req, res) => {
        try {
            const result = await departmentService.getAll();
            res.status(200).json(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json(errors);
        }
    },

    getSingle: async (req, res) => {
        const departmentId = customUtilities.toNumber(req.params.departmentId);
        try {
            const result = await departmentService.getSingle(departmentId);
            res.status(200).json(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json(errors);
        }
    },

    search: async (req, res) => {
        const searchOption = req.params.searchOption;
        const searchValue = req.params.searchValue;
        try {
            const result = await departmentService.search(searchOption, searchValue);
            res.status(200).json(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json(errors);
        }
    },

    delete: async (req, res) => {
        const departmentId = customUtilities.toNumber(req.params.departmentId);
        try {
            const result = await departmentService.delete(departmentId);
            res.status(200).json(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json(errors);
        }
    }
};