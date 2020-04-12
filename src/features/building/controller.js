const buildingController = require("./service");
const { toNumber, emptyValue } = require("../../customUtilities");

module.exports = {
  create: async (req, res) => {
    const name = emptyValue(req.body.name);
    try {
      const result = await buildingController.create(name);
      res.status(200).json(result);
    } catch (errors) {
      console.log(errors);
      res.status(400).json(errors);
    }
  },

  update: async (req, res) => {
    const buildingId = toNumber(req.params.buildingId);
    const name = emptyValue(req.body.name);
    try {
      const result = await buildingController.update(buildingId, name);
      res.status(200).json(result);
    } catch (errors) {
      console.log(errors);
      res.status(400).json(errors);
    }
  },

  getSingle: async (req, res) => {
    const buildingId = toNumber(req.params.buildingId);
    try {
      const result = await buildingController.getSingle(buildingId);
      res.status(200).json(result);
    } catch (errors) {
      console.log(errors);
      res.status(400).json(errors);
    }
  },

  getAll: async (req, res) => {
    try {
      const result = await buildingController.getAll();
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
      const result = await buildingController.search(searchOption, searchValue);
      res.status(200).json(result);
    } catch (errors) {
      console.log(errors);
      res.status(400).json(errors);
    }
  },

  delete: async (req, res) => {
    const buildingId = toNumber(req.params.buildingId);
    try {
      const result = await buildingController.delete(buildingId);
      res.status(200).json(result);
    } catch (errors) {
      console.log(errors);
      res.status(400).json(errors);
    }
  }
};
