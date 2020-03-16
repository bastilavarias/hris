const collegeService = require("./service");

module.exports = {
    create: async (req, res) => {
        const collegeData = req.body;
        try {
            const result = await collegeService.create(collegeData);
            res.status(200).json(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json(errors);
        }
    },

    update: async (req, res) => {
        const collegeId = req.params.collegeId;
        const collegeData = req.body;
        try {
            const result = await collegeService.update(collegeId, collegeData);
            res.status(200).json(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json(errors);
        }
    },

    getAll: async (req, res) => {
        try {
            const result = await collegeService.getAll();
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
            const result = await collegeService.search(searchOption, searchValue);
            res.status(200).json(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json(errors);
        }
    },

    getSingle: async (req, res) => {
        const collegeId = req.params.collegeId;
        try {
            const result = await collegeService.getSingle(collegeId);
            res.status(200).json(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json(errors);
        }
    },

    delete: async (req, res) => {
        const collegeId = req.params.collegeId;
        try {
            const result = await collegeService.delete(collegeId);
            res.status(200).json(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json(errors);
        }
    }
};