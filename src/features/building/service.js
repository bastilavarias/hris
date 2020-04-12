const buildingModel = require("./model");
const helper = require("../../helper");
const { formatData } = require("../../customUtilities");

const semesterService = {
  create: async name => {
    let error = {};
    let message = "";
    const isBuildingNameExists = await helper.checkIfExists(
      "building",
      "name",
      formatData(name)
    );
    if (isBuildingNameExists) {
      error.name = "Semester name was already used.";
      return {
        message,
        error
      };
    }
    await buildingModel.create(formatData(name));
    message = `${name} was created.`;
    return {
      message,
      error
    };
  },

  update: async (buildingId, name) => {
    let message;
    let error = {};
    const gotBuilding = await buildingModel.getSingleByName(formatData(name));
    if (Object.keys(gotBuilding).length > 1) {
      const isSameBuildingId =
        toNumber(yearLevelId) === toNumber(gotBuilding.id);
      const isSameBuildingName =
        formatData(name) === formatData(gotBuilding.name);
      if (!isSameBuildingId && isSameBuildingName) {
        error.name = "Building name was already exists.";
        return {
          message: "",
          error
        };
      }
    }
    await buildingModel.update(buildingId, formatData(name));
    message = "Building details is updated.";
    return {
      message,
      error
    };
  },

  getAll: async () => await buildingModel.getAll(),

  getSingle: async buildingId => await buildingModel.getSingle(buildingId),

  search: async (option, value) => {
    const options = {
      name: "name"
    };
    return await buildingModel.search(options[option], formatData(value));
  },

  delete: async buildingId => {
    await buildingModel.delete(buildingId);
    let message = "Building is deleted.";
    return {
      message
    };
  }
};

module.exports = semesterService;
