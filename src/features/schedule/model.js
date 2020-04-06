const db = require("../../db");

module.exports = {
    createPersonnelSchedule: async ({employeeId, currentDate, startTime, endTime}) => {
        const query = `insert into personnel_schedule (employee_id, curr_date, start_time, end_time)
                       values (?, ?, ?, ?);`;
        const params = [employeeId, currentDate, startTime, endTime];
        await db.executeQuery(query, params);
    },

    searchPersonnelSchedule: async ({employeeId, fromDate, toDate}) => {
        const query = `select id, curr_date as date, start_time as startTime, end_time as endTime
                       from personnel_schedule
                       where employee_id = ?
                         and (curr_date between ? and ?)
                       order by id;`;
        const params = [employeeId, fromDate, toDate];
        const results = await db.executeQuery(query, params);
        return results[0] ? results[0] : [];
    },

    updatePersonnelSchedule: async ({employeeId, scheduleId, startTime, endTime}) => {
        const query = `update personnel_schedule
                       set start_time = ?,
                           end_time   = ?
                       where id = ? && employee_id = ?;`;
        const params = [startTime, endTime, scheduleId, employeeId];
        await db.executeQuery(query, params);
    },

    deletePersonnelSchedule: async (scheduleId) => {
        const query = `delete
                       from personnel_schedule
                       where id = ?;`;
        const params = [scheduleId];
        await db.executeQuery(query, params);
    }
};