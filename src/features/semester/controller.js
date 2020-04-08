const semesterController = require("./service");
const { toNumber, emptyValue } = require("../../customUtilities");

module.exports = {
  create: async (req, res) => {
    const name = emptyValue(req.body.name);
    const isCurrent = req.body.isCurrent ? req.body.isCurrent : false;
    try {
      const result = await semesterController.create({ name, isCurrent });
      res.status(200).json(result);
    } catch (errors) {
      console.log(errors);
      res.status(400).json(errors);
    }
  },

  update: async (req, res) => {
    const semesterId = toNumber(req.params.semesterId);
    const name = emptyValue(req.body.name);
    const isCurrent = req.body.isCurrent ? req.body.isCurrent : false;
    try {
      const result = await semesterController.update(semesterId, {
        name,
        isCurrent
      });
      res.status(200).json(result);
    } catch (errors) {
      console.log(errors);
      res.status(400).json(errors);
    }
  },

  getCurrent: async (req, res) => {
    try {
      const result = await semesterController.getCurrent();
      res.status(200).json(result);
    } catch (errors) {
      console.log(errors);
      res.status(400).json(errors);
    }
  },

  getAll: async (req, res) => {
    try {
      const result = await semesterController.getAll();
      res.status(200).json(result);
    } catch (errors) {
      console.log(errors);
      res.status(400).json(errors);
    }
  },

  activate: async (req, res) => {
    const semesterId = toNumber(req.params.semesterId);
    try {
      const result = await semesterController.activateSemester(semesterId);
      res.status(200).json(result);
    } catch (errors) {
      console.log(errors);
      res.status(400).json(errors);
    }
  },

  delete: async (req, res) => {
    const semesterId = toNumber(req.params.semesterId);
    try {
      const result = await semesterController.delete(semesterId);
      res.status(200).json(result);
    } catch (errors) {
      console.log(errors);
      res.status(400).json(errors);
    }
  }
};
