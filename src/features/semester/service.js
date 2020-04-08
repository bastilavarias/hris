const semesterModel = require("./model");
const helper = require("../../helper");

const semesterService = {
  create: async ({ name, isCurrent }) => {
    let error = {};
    let message = "";
    const isSemesterExists = await helper.checkIfExists(
      "semester",
      "name",
      name.toLowerCase()
    );
    if (isSemesterExists) {
      error.name = "Semester name was already used.";
      return {
        message,
        error
      };
    }
    if (isCurrent) {
      await semesterService.deactivateSemesters();
    }
    await semesterModel.create({ name, isCurrent });
    message = `${name} was created.`;
    return {
      message,
      error
    };
  },

  update: async (semesterId, { name, isCurrent }) => {
    if (isCurrent) {
      await semesterService.deactivateSemesters();
    }
    await semesterModel.update(semesterId, { name, isCurrent });
    let message = "Semester was updated.";
    return {
      message
    };
  },

  getCurrent: async () => await semesterModel.getCurrent(),

  getAll: async () => await semesterModel.getAll(),

  getSingle: async semesterId => await semesterModel.getSingle(semesterId),

  search: async (option, value) => {
    const options = {
      name: "name"
    };
    return await semesterModel.search(
      options[option],
      value.trim().toLowerCase()
    );
  },

  delete: async semesterId => {
    await semesterModel.delete(semesterId);
    let message = "Semester is deleted.";
    return {
      message
    };
  },

  deactivateSemesters: async () => {
    const gotSemesters = await semesterModel.getAll();
    if (gotSemesters.length > 0) {
      gotSemesters.map(
        async semester =>
          await semesterModel.update(semester.id, {
            name: semester.name,
            isCurrent: false
          })
      );
    }
  }
};

module.exports = semesterService;
