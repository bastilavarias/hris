const scheduleService = require("./service");
const {toNumber, emptyValue} = require("../../customUtilities");

module.exports = {
    createPersonnelSchedule: async (req, res) => {
        const employeeId = toNumber(req.params.employeeId);
        const monthNumber = toNumber(req.body.monthNumber);
        const startTime = emptyValue(req.body.startTime);
        const endTime = emptyValue(req.body.endTime);

        try {
            const result = await scheduleService.createPersonnelSchedule({employeeId, monthNumber, startTime, endTime});
            res.status(200).json(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json(errors);
        }

    }
};