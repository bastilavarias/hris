const moment = require("moment");
const scheduleModel = require("./model");
const employeeModel = require("../employee/model");

const accountService = {
    createPersonnelSchedule: async ({employeeId, monthNumber, startTime, endTime, year}) => {
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

        const daysInMonth = moment(`${year}-${monthNumber + 1}`, "YYYY-MM").daysInMonth();
        console.log(daysInMonth);
        for (let index = 1; index <= daysInMonth; index++) {
            const generatedDate = new Date(`${monthNames[monthNumber]} ${index}, ${year}`);
            await scheduleModel.createPersonnelSchedule({employeeId, currentDate: generatedDate, startTime, endTime});
        }
        const gotEmployeeBasicInformation = await employeeModel.getBasicInformation(employeeId);
        const {lastName} = gotEmployeeBasicInformation.profile;
        let message = `${lastName} schedule for month of ${monthNames[monthNumber]} was created.`;

        return {
            message,
            error: {}
        };
    },

    searchPersonnelSchedule: async ({employeeId, fromDate, toDate}) => scheduleModel.searchPersonnelSchedule({
        employeeId,
        fromDate,
        toDate
    }),

    updatePersonnelSchedule: async ({employeeId, scheduleIdList, startTime, endTime}) => {
        scheduleIdList.map(async scheduleId => await scheduleModel.updatePersonnelSchedule({
            employeeId,
            scheduleId,
            startTime,
            endTime
        }));
        const gotEmployeeBasicInformation = await employeeModel.getBasicInformation(employeeId);
        const {lastName} = gotEmployeeBasicInformation.profile;
        let message = `${lastName} schedule was updated.`;

        return {
            message,
            error: {}
        };
    },

    deletePersonnelSchedule: async (employeeId, scheduleIdList) => {
        scheduleIdList.map(async scheduleId => await scheduleModel.deletePersonnelSchedule(employeeId, scheduleId));
        const gotEmployeeBasicInformation = await employeeModel.getBasicInformation(employeeId);
        const {lastName} = gotEmployeeBasicInformation.profile;
        let message = `${lastName} schedule was deleted.`;

        return {
            message,
            error: {}
        };
    }
};

module.exports = accountService;