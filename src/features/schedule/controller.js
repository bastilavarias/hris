const scheduleService = require("./service");
const {toNumber, emptyValue} = require("../../customUtilities");

module.exports = {
    createPersonnelSchedule: async (req, res) => {
        const employeeId = toNumber(req.params.employeeId);
        const monthNumber = toNumber(req.body.monthNumber);
        const startTime = emptyValue(req.body.startTime);
        const endTime = emptyValue(req.body.endTime);
        const year = toNumber(req.body.year);

        try {
            const result = await scheduleService.createPersonnelSchedule({employeeId, monthNumber, startTime, endTime, year});
            res.status(200).json(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json(errors);
        }
    },

    searchPersonnelSchedule: async (req, res) => {
        const employeeId = toNumber(req.params.employeeId);
        const fromDate = emptyValue(req.body.fromDate);
        const toDate = emptyValue(req.body.toDate);

        console.log(employeeId);
        console.log(fromDate);
        console.log(toDate);

        try {
            const result = await scheduleService.searchPersonnelSchedule({employeeId, fromDate, toDate});
            res.status(200).json(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json(errors);
        }
    }
};