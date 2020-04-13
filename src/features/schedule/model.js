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

  checkIfFacultyScheduleExists: async ({
    sectionId,
    subjectId,
    semesterId,
    schoolYear
  }) => {
    const query = `select exists(select true
                                     from faculty_schedule
                                     where section_id = ?
                                       and subject_id = ?
                                       and semester_id = ?
                                       and start_year = ?
                                       and end_year = ?
                                       and is_deleted = ?
                                  ) as "isExists";`;
    const isDeleted = false;
    const params = [
      sectionId,
      subjectId,
      semesterId,
      schoolYear.startYear,
      schoolYear.endYear,
      isDeleted
    ];
    const result = await db.executeQuery(query, params);
    return result[0][0].isExists ? result[0][0].isExists : false;
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
                                     where dtr.start_time between ? and ?
                                        or dtr.end_time between ? and ?
                                        or ? between dtr.start_time and dtr.end_time
                                        or ? between dtr.start_time and dtr.end_time and
                                           dtr.day_id = ? and dtr.room_id = ? and fs.semester_id = ? and
                                           fs.start_year = ? and fs.end_year and
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
  },

  createFacultySchedule: async ({
    sectionId,
    subjectId,
    employeeId,
    semesterId,
    schoolYear
  }) => {
    const query = `insert into faculty_schedule (section_id, subject_id, employee_id, semester_id, start_year,
                                                     end_year)
                       values (?, ?, ?, ?, ?, ?);`;
    const params = [
      sectionId,
      subjectId,
      employeeId,
      semesterId,
      schoolYear.startYear,
      schoolYear.endYear
    ];
    const result = await db.executeQuery(query, params);
    return result[0].insertId;
  },

  addDayTimeRoom: async ({ scheduleId, dayId, roomId, startTime, endTime }) => {
    const query = `insert into day_time_room (faculty_schedule_id, day_id, room_id, start_time, end_time) values (?, ?, ?, ?, ?);`;
    const params = [scheduleId, dayId, roomId, startTime, endTime];
    await db.executeQuery(query, params);
  },

  deleteDayTimeRoom: async scheduleId => {
    const query = `delete from day_time_room where faculty_schedule_id = ?;`;
    const params = [facultyScheduleId];
    await db.executeQuery(query, params);
  },

  updateFacultySchedule: async ({ scheduleId, employeeId }) => {
    const query = `update faculty_schedule set employee_id = ? where id = ?;`;
    const params = [employeeId, scheduleId];
    await db.executeQuery(query, params);
  },

  getSingleFacultySchedule: async () => {}
};
