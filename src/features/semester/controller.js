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

  getSingle: async (req, res) => {
    const semesterId = toNumber(req.params.semesterId);
    try {
      const result = await semesterController.getSingle(semesterId);
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

  search: async (req, res) => {
    const searchOption = req.params.searchOption;
    const searchValue = req.params.searchValue;
    try {
      const result = await semesterController.search(searchOption, searchValue);
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
