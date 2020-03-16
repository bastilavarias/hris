const courseService = require("./service");

module.exports = {
    create: async (req, res) => {
        const courseData = req.body;
        try {
            const result = await courseService.create(courseData);
            res.status(200).json(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json(errors);
        }
    },

    update: async (req, res) => {
        const courseId = req.params.courseId;
        const courseData = req.body;
        try {
            const result = await courseService.update(courseId, courseData);
            res.status(200).json(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json(errors);
        }
    },

    getAll: async (req, res) => {
        try {
            const result = await courseService.getAll();
            res.status(200).json(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json(errors);
        }
    },

    getSingle: async (req, res) => {
        const courseId = req.params.courseId;
        try {
            const result = await courseService.getSingle(courseId);
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
            const result = await courseService.search(searchOption, searchValue);
            res.status(200).json(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json(errors);
        }
    },

    delete: async (req, res) => {
        const courseId = req.params.courseId;
        try {
            const result = await courseService.delete(courseId);
            res.status(200).json(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json(errors);
        }
    }
};