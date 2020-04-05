const db = require("../../db");

module.exports = {
    createPersonnelSchedule: async ({employeeId, currentDate, startTime, endTime}) => {
        const query = `insert into personnel_schedule (employee_id, curr_date, start_time, end_time) values (?, ?, ?, ?);`;
        const params = [employeeId, currentDate, startTime, endTime];
        await db.executeQuery(query, params);
    }
};