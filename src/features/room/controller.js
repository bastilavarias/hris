const roomService = require("./service");
const { toNumber, emptyValue } = require("../../customUtilities");

module.exports = {
  create: async (req, res) => {
    const buildingId = toNumber(req.body.buildingId);
    const name = emptyValue(req.body.name);
    try {
      const result = await roomService.create(buildingId, name);
      res.status(200).json(result);
    } catch (errors) {
      console.log(errors);
      res.status(400).json(errors);
    }
  },

  update: async (req, res) => {
    const roomId = toNumber(req.params.roomId);
    const buildingId = toNumber(req.body.buildingId);
    const name = emptyValue(req.body.name);
    try {
      const result = await roomService.update(roomId, buildingId, name);
      res.status(200).json(result);
    } catch (errors) {
      console.log(errors);
      res.status(400).json(errors);
    }
  },

  getSingle: async (req, res) => {
    const roomId = toNumber(req.params.roomId);
    try {
      const result = await roomService.getSingle(roomId);
      res.status(200).json(result);
    } catch (errors) {
      console.log(errors);
      res.status(400).json(errors);
    }
  },

  getAll: async (req, res) => {
    try {
      const result = await roomService.getAll();
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
      const result = await roomService.search(searchOption, searchValue);
      res.status(200).json(result);
    } catch (errors) {
      console.log(errors);
      res.status(400).json(errors);
    }
  },

  delete: async (req, res) => {
    const roomId = toNumber(req.params.roomId);
    try {
      const result = await roomService.delete(roomId);
      res.status(200).json(result);
    } catch (errors) {
      console.log(errors);
      res.status(400).json(errors);
    }
  }
};
