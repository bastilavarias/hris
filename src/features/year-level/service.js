const yearLevelModel = require("./model");
const { checkIfExists } = require("../../helper");
const { formatData, toNumber } = require("../../customUtilities");

module.exports = {
  create: async name => {
    let error = {};
    let message = "";
    const isYearLevelExists = await checkIfExists(
      "year_level",
      "name",
      formatData(name)
    );
    if (isYearLevelExists) {
      error.name = "Year level name was already exists.";
      return {
        message,
        error
      };
    }
    await yearLevelModel.create(name);
    message = "New year level is created.";
    return {
      error,
      message
    };
  },

  update: async (yearLevelId, name) => {
    let message;
    let error = {};
    const gotYearLevel = await yearLevelModel.getSingleByName(formatData(name));
    if (Object.keys(gotYearLevel).length > 1) {
      const isSameYearLevelId =
        toNumber(yearLevelId) === toNumber(gotYearLevel.id);
      const isSameYearLevelName =
        formatData(name) === formatData(gotYearLevel.name);
      if (!isSameYearLevelId && isSameYearLevelName) {
        error.name = "Year level name was already exists.";
        return {
          message: "",
          error
        };
      }
    }
    await yearLevelModel.update(yearLevelId, formatData(name));
    message = "Year level is updated.";
    return {
      message,
      error
    };
  },

  getAll: async () => await yearLevelModel.getAll(),

  getSingle: async yearLevelId => await yearLevelModel.getSingle(yearLevelId),

  search: async (option, value) => {
    const options = {
      name: "name"
    };
    return await yearLevelModel.search(options[option], formatData(value));
  },

  delete: async yearLevelId => {
    let message;
    await yearLevelModel.delete(yearLevelId);
    message = "Year level was deleted.";
    return {
      message
    };
  }
};
