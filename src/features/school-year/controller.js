const schoolYearService = require("./service");

module.exports = {
  getCurrent: async (req, res) => {
    try {
      const result = await schoolYearService.getCurrent();
      res.status(200).json(result);
    } catch (errors) {
      console.log(errors);
      res.status(400).json(errors);
    }
  },

  update: async (req, res) => {
    const startYear = req.body.startYear;
    const endYear = req.body.endYear;
    try {
      const result = await schoolYearService.update({ startYear, endYear });
      res.status(200).json(result);
    } catch (errors) {
      console.log(errors);
      res.status(400).json(errors);
    }
  }
};
