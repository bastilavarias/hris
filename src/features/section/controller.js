const sectionService = require("./service");
const { toNumber, emptyValue } = require("../../customUtilities");

module.exports = {
  create: async (req, res) => {
    const sectionData = {
      code: emptyValue(req.body.code),
      name: emptyValue(req.body.name),
      description: emptyValue(req.body.description),
      yearLevelId: toNumber(req.body.yearLevelId),
      collegeId: toNumber(req.body.collegeId),
      courseId: toNumber(req.body.courseId)
    };
    try {
      const result = await sectionService.create(sectionData);
      res.status(200).json(result);
    } catch (errors) {
      console.log(errors);
      res.status(400).json(errors);
    }
  },

  update: async (req, res) => {
    const sectionId = toNumber(req.params.sectionId);
    const sectionData = {
      code: emptyValue(req.body.code),
      name: emptyValue(req.body.name),
      description: emptyValue(req.body.description),
      yearLevelId: toNumber(req.body.yearLevelId),
      collegeId: toNumber(req.body.collegeId),
      courseId: toNumber(req.body.courseId)
    };
    try {
      const result = await sectionService.update(sectionId, sectionData);
      res.status(200).json(result);
    } catch (errors) {
      console.log(errors);
      res.status(400).json(errors);
    }
  },

  getAll: async (req, res) => {
    try {
      const result = await sectionService.getAll();
      res.status(200).json(result);
    } catch (errors) {
      console.log(errors);
      res.status(400).json(errors);
    }
  },

  getSingle: async (req, res) => {
    const sectionId = toNumber(req.params.sectionId);
    try {
      const result = await sectionService.getSingle(sectionId);
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
      const result = await sectionService.search(searchOption, searchValue);
      res.status(200).json(result);
    } catch (errors) {
      console.log(errors);
      res.status(400).json(errors);
    }
  },

  delete: async (req, res) => {
    const sectionId = toNumber(req.params.sectionId);
    try {
      const result = await sectionService.delete(sectionId);
      res.status(200).json(result);
    } catch (errors) {
      console.log(errors);
      res.status(400).json(errors);
    }
  }
};
