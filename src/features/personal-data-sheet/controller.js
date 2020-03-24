const personalDataSheetService = require("./service");

module.exports = {
    getSingle: async (req, res) => {
        const employeeId = req.params.employeeId ? parseInt(req.params.employeeId) : null;
        try {
            const result = await personalDataSheetService.getSingle(employeeId);
            res.status(200).json(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json(errors);
        }
    },
};