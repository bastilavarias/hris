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

    const gotRawYearLevel = await yearLevelModel.getRawByName(formatData(name));
    const isSameYearLevelId =
      toNumber(yearLevelId) === toNumber(gotRawYearLevel.id);
    const isSameYearLevelName =
      formatData(name) === formatData(gotRawYearLevel.name);
    if (
      !isSameYearLevelId &&
      isSameYearLevelName &&
      !gotRawYearLevel.isDeleted
    ) {
      error.name = "Year level name was already exists.";
      return {
        message: "",
        error
      };
    }

    await yearLevelModel.update(yearLevelId, formatData(name));
    message = "Year level is updated.";
    return {
      message
    };
  },

  getAll: async () => await yearLevelModel.getAll(),

  getSingle: async yearLevelId => await yearLevelModel.getSingle(yearLevelId),

  delete: async yearLevelId => {
    let message;
    await yearLevelModel.delete(yearLevelId);
    message = "Year level was deleted.";
    return {
      message
    };
  }
};
