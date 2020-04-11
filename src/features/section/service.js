const sectionModel = require("./model");
const helper = require("../../helper");

module.exports = {
  create: async ({
    code,
    name,
    description,
    yearLevelId,
    collegeId,
    courseId
  }) => {
    let error = {};
    let message = "";
    const isSectionExists = await helper.checkIfExists(
      "section",
      "code",
      code.toLowerCase()
    );
    if (isSectionExists) {
      error.code = "Section code was already used.";
      return {
        message,
        error
      };
    }
    await sectionModel.create({
      code,
      name,
      description,
      yearLevelId,
      collegeId,
      courseId
    });
    message = "New section is created.";
    return {
      error,
      message
    };
  },

  update: async (
    sectionId,
    { name, description, yearLevelId, collegeId, courseId }
  ) => {
    let message;
    await sectionModel.update(sectionId, {
      name,
      description,
      yearLevelId,
      collegeId,
      courseId
    });
    message = "Section is updated.";
    return {
      message
    };
  },

  getAll: async () => await sectionModel.getAll(),

  getSingle: async sectionId => await sectionModel.getSingle(sectionId),

  search: async (option, value) => {
    const options = {
      code: "code",
      name: "name"
    };
    return await sectionModel.search(
      options[option],
      value.trim().toLowerCase()
    );
  },

  delete: async sectionId => {
    let message;
    await sectionModel.delete(sectionId);
    message = "Section is deleted.";
    return {
      message
    };
  }
};
