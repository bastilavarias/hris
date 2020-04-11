const yearLevelService = require("./service");
const { toNumber, emptyValue } = require("../../customUtilities");

module.exports = {
  create: async (req, res) => {
    const yearLevelId = toNumber(req.params.yearLevelId);
    const name = emptyValue(req.body.name);
    try {
      const result = await yearLevelService.create(name);
      res.status(200).json(result);
    } catch (errors) {
      console.log(errors);
      res.status(400).json(errors);
    }
  },

  update: async (req, res) => {
    const yearLevelId = toNumber(req.params.yearLevelId);
    const name = emptyValue(req.body.name);
    try {
      const result = await yearLevelService.update(yearLevelId, name);
      res.status(200).json(result);
    } catch (errors) {
      console.log(errors);
      res.status(400).json(errors);
    }
  },

  getAll: async (req, res) => {
    try {
      const result = await yearLevelService.getAll();
      res.status(200).json(result);
    } catch (errors) {
      console.log(errors);
      res.status(400).json(errors);
    }
  },

  getSingle: async (req, res) => {
    const yearLevelId = toNumber(req.params.yearLevelId);
    try {
      const result = await yearLevelService.getSingle(yearLevelId);
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
      const result = await yearLevelService.search(searchOption, searchValue);
      res.status(200).json(result);
    } catch (errors) {
      console.log(errors);
      res.status(400).json(errors);
    }
  },

  delete: async (req, res) => {
    const yearLevelId = toNumber(req.params.yearLevelId);
    try {
      const result = await yearLevelService.delete(yearLevelId);
      res.status(200).json(result);
    } catch (errors) {
      console.log(errors);
      res.status(400).json(errors);
    }
  }
};
