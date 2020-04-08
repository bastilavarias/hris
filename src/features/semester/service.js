const semesterModel = require("./model");
const helper = require("../../helper");
const { formatData } = require("../../customUtilities");

const semesterService = {
  create: async ({ name, isCurrent }) => {
    let error = {};
    let message = "";
    const isSemesterExists = await helper.checkIfExists(
      "semester",
      "name",
      formatData(name)
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
    const formattedName = formatData(name);
    await semesterModel.create({ name: formattedName, isCurrent });
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
    const formattedName = formatData(name);
    await semesterModel.update(semesterId, { name: formattedName, isCurrent });
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
    return await semesterModel.search(options[option], formatData(value));
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
