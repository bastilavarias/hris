const schoolYearModel = require("./model");

module.exports = {
  getCurrent: async () => await schoolYearModel.getCurrent(),

  update: async ({ startYear, endYear }) => {
    await schoolYearModel.update({ startYear, endYear });
    let message = "School Year was updated.";
    return {
      message
    };
  }
};
