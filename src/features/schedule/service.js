const moment = require("moment");
const scheduleModel = require("./model");
const employeeModel = require("../employee/model");
const schoolYearModel = require("../school-year/model");
const semesterModel = require("../semester/model");

const scheduleService = {
  createPersonnelSchedule: async ({
    employeeId,
    monthNumber,
    startTime,
    endTime,
    year
  }) => {
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

    const daysInMonth = moment(
      `${year}-${monthNumber + 1}`,
      "YYYY-MM"
    ).daysInMonth();
    for (let index = 1; index <= daysInMonth; index++) {
      const generatedDate = new Date(
        `${monthNames[monthNumber]} ${index}, ${year}`
      );
      await scheduleModel.createPersonnelSchedule({
        employeeId,
        currentDate: generatedDate,
        startTime,
        endTime
      });
    }
    const gotEmployeeBasicInformation = await employeeModel.getBasicInformation(
      employeeId
    );
    const { lastName } = gotEmployeeBasicInformation.profile;
    let message = `${lastName} schedule for month of ${monthNames[monthNumber]} was created.`;

    return {
      message,
      error: {}
    };
  },

  searchPersonnelSchedule: async ({ employeeId, fromDate, toDate }) =>
    scheduleModel.searchPersonnelSchedule({
      employeeId,
      fromDate,
      toDate
    }),

  updatePersonnelSchedule: async ({
    employeeId,
    scheduleIdList,
    startTime,
    endTime
  }) => {
    scheduleIdList.map(
      async scheduleId =>
        await scheduleModel.updatePersonnelSchedule({
          employeeId,
          scheduleId,
          startTime,
          endTime
        })
    );
    const gotEmployeeBasicInformation = await employeeModel.getBasicInformation(
      employeeId
    );
    const { lastName } = gotEmployeeBasicInformation.profile;
    let message = `${lastName} schedule was updated.`;

    return {
      message,
      error: {}
    };
  },

  deletePersonnelSchedule: async (employeeId, scheduleIdList) => {
    scheduleIdList.map(
      async scheduleId =>
        await scheduleModel.deletePersonnelSchedule(employeeId, scheduleId)
    );
    const gotEmployeeBasicInformation = await employeeModel.getBasicInformation(
      employeeId
    );
    const { lastName } = gotEmployeeBasicInformation.profile;
    let message = `${lastName} schedule was deleted.`;

    return {
      message,
      error: {}
    };
  },

  getPersonalPersonnelSchedule: async (employeeId, date) => {
    const givenYear = moment(date).year();
    const givenMonth = moment(date).month();

    const daysInMonth = moment(
      `${givenYear}-${givenMonth + 1}`,
      "YYYY-MM"
    ).daysInMonth();
    const fromDate = new Date(`${givenYear}-${givenMonth + 1}-1`);
    const toDate = new Date(`${givenYear}-${givenMonth + 1}-${daysInMonth}`);
    return await scheduleModel.getPersonalPersonnelSchedule({
      employeeId,
      fromDate,
      toDate
    });
  },

  createFacultySchedule: async ({
    sectionId,
    subjectId,
    employeeId,
    dayTimeRoom,
    isToBeAnnounce
  }) => {
    const gotCurrentSemester = await semesterModel.getCurrent();
    const gotCurrentSchoolYear = await schoolYearModel.getCurrent();
    let message = "";
    let error = {};

    if (dayTimeRoom.length > 0 && !isToBeAnnounce) {
      error.dayTimeRoom = [];
      error.dayTimeRoom = scheduleService.validateDayTimeRoom({
        dayTimeRoom,
        semesterId: gotCurrentSemester.id,
        schoolYear: gotCurrentSchoolYear
      });
      if (error.dayTimeRoom.length > 0) {
        return {
          message,
          error
        };
      }
    }
  },

  validateDayTimeRoom: async ({ dayTimeRoom, semesterId, schoolYear }) => {
    const errors = [];
    for (const { startTime, endTime, dayId, roomId } of dayTimeRoom) {
      const hasTimeConflict = await scheduleModel.checkIfRoomIsOccupied({
        startTime,
        endTime,
        dayId,
        roomId,
        semesterId,
        schoolYear
      });
      if (hasTimeConflict) {
        const errorMessage = `Room is occupied.`;
        errors.push(errorMessage);
      }
    }
  }
};

module.exports = scheduleService;
