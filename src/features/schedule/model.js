const db = require("../../db");

module.exports = {
  createPersonnelSchedule: async ({
    employeeId,
    currentDate,
    startTime,
    endTime
  }) => {
    const query = `insert into personnel_schedule (employee_id, curr_date, start_time, end_time)
                       values (?, ?, ?, ?);`;
    const params = [employeeId, currentDate, startTime, endTime];
    await db.executeQuery(query, params);
  },

  searchPersonnelSchedule: async ({ employeeId, fromDate, toDate }) => {
    const query = `select id, curr_date as date, start_time as startTime, end_time as endTime
                       from personnel_schedule
                       where employee_id = ?
                         and (curr_date between ? and ?)
                       order by curr_date;`;
    const params = [employeeId, fromDate, toDate];
    const result = await db.executeQuery(query, params);
    return result[0] ? result[0] : [];
  },

  updatePersonnelSchedule: async ({
    employeeId,
    scheduleId,
    startTime,
    endTime
  }) => {
    const query = `update personnel_schedule
                       set start_time = ?,
                           end_time   = ?
                       where id = ?
                         and employee_id = ?;`;
    const params = [startTime, endTime, scheduleId, employeeId];
    await db.executeQuery(query, params);
  },

  deletePersonnelSchedule: async (employeeId, scheduleId) => {
    const query = `delete
                       from personnel_schedule
                       where id = ?
                         and employee_id = ?;`;
    const params = [scheduleId, employeeId];
    await db.executeQuery(query, params);
  },

  getPersonalPersonnelSchedule: async ({ employeeId, fromDate, toDate }) => {
    const query = `select id, curr_date as date, start_time as startTime, end_time as endTime
                       from personnel_schedule
                       where employee_id = ?
                         and (curr_date between ? and ?)
                       order by id;`;
    const params = [employeeId, fromDate, toDate];
    const result = await db.executeQuery(query, params);
    return result[0] ? result[0] : [];
  },

  checkIfRoomIsOccupied: async ({
    startTime,
    endTime,
    dayId,
    roomId,
    semesterId,
    schoolYear
  }) => {
    const query = `select exists(select true
                                     from day_time_room dtr
                                              join faculty_schedule fs on dtr.faculty_schedule_id = fs.id
                                              join school_year sy on fs.school_year_id = sy.id
                                     where dtr.start_time between ? and ?
                                        or dtr.end_time between ? and ?
                                        or ? between dtr.start_time and dtr.end_time
                                        or ? between dtr.start_time and dtr.end_time and
                                           dtr.day_id = ? and dtr.room_id = ? and fs.semester_id = ? and
                                           sy.start_year = ? and sy.end_year and
                                           fs.is_deleted = ?
                                  ) as "isExists";`;
    const isDeleted = false;
    const params = [
      startTime,
      endTime,
      startTime,
      endTime,
      startTime,
      endTime,
      dayId,
      roomId,
      semesterId,
      schoolYear.startYear,
      schoolYear.endYear,
      isDeleted
    ];
    const result = await db.executeQuery(query, params);
    return result[0][0].isExists ? result[0][0].isExists : false;
  }
};
