const moment = require("moment");
const scheduleModel = require("./model");
const employeeModel = require("../employee/model")

const accountService = {
    createPersonnelSchedule: async ({employeeId, monthNumber, startTime, endTime}) => {
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const daysInMonth = moment(`${currentYear}-${monthNumber + 1}`, "YYYY-MM").daysInMonth();
        for (let index = 1; index <= daysInMonth; index++) {
            const generatedDate = new Date(`${monthNames[monthNumber]} ${index}, ${currentYear}`);
            await scheduleModel.createPersonnelSchedule({employeeId, currentDate: generatedDate, startTime, endTime})
        }
        const gotEmployeeBasicInformation = await employeeModel.getBasicInformation(employeeId);
        const {lastName} = gotEmployeeBasicInformation.profile;
        let message = `${lastName} schedule for month of ${monthNames[monthNumber]} was created.`;

        return {
            message
        }
    }
};

module.exports = accountService;