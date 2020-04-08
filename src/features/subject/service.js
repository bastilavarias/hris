const subjectModel = require("./model");
const helper = require("../../helper");

module.exports = {
  create: async ({
    code,
    title,
    description,
    units,
    categoryId,
    prerequisiteSubjectId
  }) => {
    let error = {};
    let message = "";
    const isSubjectExists = await helper.checkIfExists(
      "subject",
      "code",
      code.toLowerCase()
    );
    if (isSubjectExists) {
      error.code = "Subject code was already used.";
      return {
        message,
        error
      };
    }
    const createdSubjectId = await subjectModel.create({
      code,
      title,
      description,
      units,
      categoryId
    });
    if (prerequisiteSubjectId) {
      await subjectModel.addPrerequisite(
        createdSubjectId,
        prerequisiteSubjectId
      );
    }
    message = "New subject is created.";
    return {
      error,
      message
    };
  },

  update: async (
    subjectId,
    { title, description, units, categoryId, prerequisiteSubjectId }
  ) => {
    let message;
    await subjectModel.update(subjectId, {
      title,
      description,
      units,
      categoryId
    });
    await subjectModel.deleteAllPrerqeuisites(subjectId);
    if (prerequisiteSubjectId) {
      await subjectModel.addPrerequisite(subjectId, prerequisiteSubjectId);
    }
    message = "Subject is updated.";
    return {
      message
    };
  },

  getAll: async () => {
    return await subjectModel.getAll();
  },

  getSingle: async subjectId => {
    return await subjectModel.getSingle(subjectId);
  },

  search: async (option, value) => {
    const options = {
      code: "code",
      title: "title"
    };
    return await subjectModel.search(
      options[option],
      value.trim().toLowerCase()
    );
  },

  delete: async subjectId => {
    let message;
    await subjectModel.delete(subjectId);
    message = "Subject is deleted.";
    return {
      message
    };
  },

  getCategories: async () => {
    return await subjectModel.getCategories();
  }
};
